import {aboutPage} from './documents/aboutPage'
import {homePage} from './documents/homePage'
import {project} from './documents/project'
import {projectsPage} from './documents/projectsPage'
import {service} from './documents/service'
import {siteSettings} from './documents/siteSettings'

export const schemaTypes = [homePage, aboutPage, projectsPage, siteSettings, project, service]

/** Tek kayıtlık (singleton) belgeler: sabit ID ile tutulur, yenisi oluşturulamaz, silinemez. */
export const singletonTypes = new Set(['homePage', 'aboutPage', 'projectsPage', 'siteSettings'])
