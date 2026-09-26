import {LockIcon} from '@sanity/icons/Lock'
import {UnlockIcon} from '@sanity/icons/Unlock'
import {Box, Button, Card, Flex, Stack, Text} from '@sanity/ui'
import {useCallback, useState} from 'react'
import {
  getPublishedId,
  type SlugInputProps,
  useCurrentUser,
  useDocumentOperation,
  useEditState,
  useFormValue,
} from 'sanity'

export const ADMIN_ROLE = 'administrator'

/**
 * Proje adresi (slug) alanı.
 *
 * - Hiç yayınlanmamış projede normal çalışır ("Generate" ile oluşturulur).
 * - Yayınlanmış projede kilitlidir: başlık değişse de adres değişmez.
 * - Yalnızca yönetici (Administrator) kilidi onay alarak açabilir. Adres değiştirilirse
 *   eski adres "önceki adresler" listesine eklenir ve site eski adresi yeni adrese
 *   yönlendirir (308).
 *
 * Bu bileşen yalnızca arayüzdür; asıl koruma alanın doğrulama kuralındadır
 * (bkz. schemaTypes/objects/slug.ts → publishedSlugGuard).
 */
export function LockedSlugInput(props: SlugInputProps) {
  const documentId = useFormValue(['_id']) as string | undefined
  const documentType = (useFormValue(['_type']) as string | undefined) ?? 'project'
  const previousSlugs = (useFormValue(['previousSlugs']) as string[] | undefined) ?? []
  const publishedId = documentId ? getPublishedId(documentId) : ''

  const {published} = useEditState(publishedId, documentType)
  const {patch} = useDocumentOperation(publishedId, documentType)
  const currentUser = useCurrentUser()

  const publishedSlug = (published?.slug as {current?: string} | undefined)?.current
  const isAdmin = Boolean(currentUser?.roles?.some((role) => role.name === ADMIN_ROLE))
  const [unlocked, setUnlocked] = useState(false)

  const {onChange} = props
  const handleChange = useCallback<SlugInputProps['onChange']>(
    (event) => {
      // Yayınlanmış adres ilk kez değiştirildiğinde onu önceki adreslere ekle
      if (publishedSlug && !previousSlugs.includes(publishedSlug)) {
        patch.execute([{setIfMissing: {previousSlugs: []}}, {insert: {after: 'previousSlugs[-1]', items: [publishedSlug]}}])
      }
      onChange(event)
    },
    [onChange, patch, previousSlugs, publishedSlug],
  )

  // Yeni (hiç yayınlanmamış) proje: normal alan
  if (!publishedSlug) return props.renderDefault(props)

  if (unlocked) {
    return (
      <Stack gap={3}>
        <Card padding={3} radius={2} tone="caution" border>
          <Text size={1}>
            Adres kilidi açık. Yeni adresi yayınladığınızda eski adres (/projeler/{publishedSlug}) otomatik olarak yeni
            adrese yönlendirilir.
          </Text>
        </Card>
        {props.renderDefault({...props, onChange: handleChange})}
      </Stack>
    )
  }

  const current = props.value?.current
  return (
    <Card padding={3} radius={2} border tone="transparent">
      <Flex align="center" gap={3}>
        <Text muted size={1}>
          <LockIcon />
        </Text>
        <Box flex={1}>
          <Stack gap={2}>
            <Text size={1} weight="medium">
              /projeler/{current ?? publishedSlug}
            </Text>
            <Text size={1} muted>
              {isAdmin
                ? 'Yayınlanmış projenin adresi kilitlidir; proje adını değiştirmek adresi etkilemez.'
                : 'Yayınlanmış projenin adresi kilitlidir. Proje adını değiştirmek adresi etkilemez; adresi yalnızca yönetici değiştirebilir.'}
            </Text>
          </Stack>
        </Box>
        {isAdmin && (
          <Button
            icon={UnlockIcon}
            mode="ghost"
            text="Kilidi aç"
            tone="caution"
            onClick={() => {
              const ok = window.confirm(
                `Bu projenin adresi yayında: /projeler/${publishedSlug}\n\n` +
                  'Adresi değiştirirseniz eski adres yeni adrese yönlendirilir, ancak paylaşılmış bağlantıların ' +
                  've arama motorlarının yeni adresi öğrenmesi zaman alabilir.\n\nYine de kilidi açmak istiyor musunuz?',
              )
              if (ok) setUnlocked(true)
            }}
          />
        )}
      </Flex>
    </Card>
  )
}
