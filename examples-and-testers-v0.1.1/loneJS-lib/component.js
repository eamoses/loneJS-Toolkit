var _COMPONENTS_STORED_GLOBALLY = []

class Component {

  constructor (name) {
    this.tag = name
    this.id = '#' + name.split('-').splice(0,name.split('-').length-1).join('-')
    this.events = []
  }

  _NEW_ELM (that = this) {
    let proto = Object.create(HTMLElement.prototype)
    const importDoc = document.currentScript.ownerDocument
    const template = importDoc.querySelector(that.id)
    that.htmlJS = new HtmlJS
    proto.createdCallback = function () {
      that.root = this.attachShadow({ mode: 'open' })
      const clone = document.importNode(template.content, true)
      //
      //
      // if (this.hasAttribute('serve')) that.serveDir(this)
      that.serveDir(this)
      // ^^^ added because non-served components still need local data storred, but were given value as if they'd been initially served.
      //for (const e of that.events) {
        // if (e.id) {
          // that.setEventClone(clone.getElementById(e.id),e,this,that)

          // let newEvent = clone.getElementById(e.id)
          // // console.log('aaaa', newEvent)
          // newEvent.addEventListener(e.type, ()=>{
          //   // console.log('bbb', newEvent)
          //   const cdata = this.hasAttribute('serve') ? this.getAttribute('served') : null
          //   if (cdata) that.data = JSON.parse(cdata)
          //   that.root = this.shadowRoot
          //   e.method()
          //   if (e.update) that.update(this)
          // })

        // }
        // if (e.class) {
        //   const elms = clone.querySelectorAll('[class='+e.class+']')
        //   for (const newEvent of elms) {
        //     // that.setEventClone(newEvent,e,this,that)
        //     console.log(newEvent)
        //     newEvent.addEventListener(e.type, ()=>{
        //       const cdata = this.hasAttribute('serve') ? this.getAttribute('served') : null
        //       if (cdata) that.data = JSON.parse(cdata)
        //       that.root = this.shadowRoot
        //       e.method()
        //       if (e.update) that.update(this)
        //     })
        //   }
        // }
      // }
      that.root.appendChild(clone)
    }
    proto.attributeChangedCallback = function (attrName, oldVal, newVal) {
      that.root = this.shadowRoot
      if (attrName === 'served' && this.getAttribute('served') !== 'undefined') {
        that.data = JSON.parse(this.getAttribute('served'))
        if (that._ON_SET) that._ON_SET(attrName) // THERE IS A REASON WHY THIS IS SANDWICHED!!!!
        const data = that.htmlJS.update(that.data, that.root, that.events)
        //
        //
        for (const e of that.events) {
          if (e.id) {
            let elm = that.root.getElementById(e.id)
            elm.addEventListener(e.type, ()=>{
              that.UpdatedEventData(data)
              e.method()
              // if (e.update) this.update(this)
            })
          }

          if (e.class) {
            const elms = that.root.querySelectorAll('[class='+e.class+']')
            for (const newEvent of elms) {
              newEvent.addEventListener(e.type, ()=>{
                that.UpdatedEventData(data)
                e.method()
                // if (e.update) that.update(this)
              })
            }
          }
        }
        //
        //
        if (that._ON_SET) that._ON_SET(attrName) // THERE IS A REASON WHY THIS IS SANDWICHED!!!!
      } else if (attrName === 'directory' && that._ON_SET && this.getAttribute('served') !== 'undefined') {
        that.directory = this.getAttribute('directory')
        that.data = JSON.parse(this.getAttribute('served'))
        that._ON_SET(attrName)
      }
    }

    if (!_POLYFILL_INCLUDED) {
      document.registerElement(that.tag, {prototype: proto})
    } else {
      window.addEventListener('WebComponentsReady', (e)=>{
        document.registerElement(that.tag, {prototype: proto})
      })
    }
  }

  UpdatedEventData (data) {
    this.data = data
  }

  _ADD_EVENT (type, id, method, update) {
    this.events.push( {'type': type, 'method': method, 'id': id, 'update': update} )
  }

  _ADD_CL_EVENT (type, cl, method, update) {
    this.events.push( {'type': type, 'method': method, 'class': cl, 'update': update} )
  }

  getDir (obj, dir, mDir = dir.split(' '), oObj = { '_DATA': obj }, mObj = []) {
    if (dir === 'c.data') return this.data
    if (mDir.length > 1) {
      for (const i in mDir) {
        for (const p of mDir[i].split(/[.\[\]]/).filter(Boolean)) oObj = oObj[p]
        mObj.push(oObj)
        oObj = { '_DATA': obj }
      }
      oObj = mObj
    } else {
      if (dir) for (const p of dir.split(/[.\[\]]/).filter(Boolean)) oObj = oObj[p]
    }
    return oObj
  }

  update () {
    for (const component of _COMPONENTS_STORED_GLOBALLY) {
      if (component.hasAttribute('serve')) {
        const serve = component.getAttribute('serve')
        component.setAttribute('served', JSON.stringify(this.getDir(_DATA, serve)))
      }
    }
  }

  serveDir (that) {
    if (that.hasAttribute('serve')) {
      let served = document.createAttribute('served')
      console.log('~~~0', this.data )

      served.value = JSON.stringify(this.getDir(_DATA, that.getAttribute('serve')))
      that.setAttributeNode(served)
    }
    else if (!that.hasAttribute('serve') && this.data) {
      let serve = document.createAttribute('serve')
      serve.value = 'c.data'
      that.setAttributeNode(serve)
      let served = document.createAttribute('served')
      served.value = '{}'
      that.setAttributeNode(served)
    }
    let pageStatus = document.createAttribute('directory')
    pageStatus.value = window.location.hash.split('#')[1]
    that.setAttributeNode(pageStatus)
    _COMPONENTS_STORED_GLOBALLY.push(that)
  }

  I (id) { return this.root.getElementById(id) }

  CL (className) { return this.root.querySelectorAll('[class='+className+']') }

  KV (e) { return [ e.path[0].getAttribute('key'), e.path[0].getAttribute('val') ] }

  E (e) { return e.path[0] }

  KVE (e) { return [
    e.path[0].getAttribute('key'),
    e.path[0].getAttribute('val'),
    e.path[0]
  ] }

  // !!! *** SAVE *** !!!
  // _TEST_EVENT (type, id, method, update) { // test how to dig into components after the fact.... With this concept we could fetch/add founchtions from any component at any time. Could be used to make javascript in components more accessable in the future.
  //   setTimeout(()=>{
  //     const tag = this.root.host.localName
  //     for (const x of this.root.ownerDocument.all) {
  //       if (tag === x.localName) { console.dir(x);
  //         let elm = x.shadowRoot.getElementById(id)
  //         elm.addEventListener(type, ()=>{ method() } )
  // } } }, 100) } // it needs a delay for some reason otherwise it can't find anything.

}
