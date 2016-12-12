import domReady from 'domready'
import WebFont from 'webfontloader'
import BarbaWrapper from './BarbaWrapper'
import HomePage from './pages/HomePage'
import PostPage from './pages/PostPage'
import AboutPage from './pages/AboutPage'

const DOM_READY_EVENT = 'dom-ready'
const FONTS_READY_EVENT = 'fonts-ready'
const dbg = debug('app:App')

export default class App {
  constructor () {
    dbg('Init App')
    this.events = []
    this.waitDomReady()
    this.waitFontsReady() // comment if you don't load fonts with webfontloader
  }

  start () {
    dbg('start')

    new BarbaWrapper({
      cache: false,
      prefetch: true
    })
      .match('HomePage', new HomePage())
      .match('AboutPage', new AboutPage())
      .match('PostPage', new PostPage())
      .start()
  }

  waitDomReady () {
    this.events.push(DOM_READY_EVENT)
    domReady(() => {
      dbg('DOM ready')
      this.onLoadEventSuccess(DOM_READY_EVENT)
    })
  }

  waitFontsReady () {
    this.events.push(FONTS_READY_EVENT)
    WebFont.load({
      google: {
        families: ['Montserrat:400,700'],
        text: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ?!.,>%éèà1234567890'
      },
      classes: false,
      active: () => {
        dbg('fonts ready')
        this.onLoadEventSuccess(FONTS_READY_EVENT)
      }
    })
  }

  onLoadEventSuccess (key) {
    this.events.splice(this.events.indexOf(key), 1)
    if (this.events.length === 0) {
      this.start()
    }
  }
}
