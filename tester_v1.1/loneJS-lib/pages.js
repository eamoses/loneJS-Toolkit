var _OLD_HASH = window.location.hash.split('#')[1]

document.onreadystatechange = ()=>{
  if (document.readyState === 'complete') {
    _PAGE_SET(window.location.hash.split('#')[1], true)
  }
}

_PAGE_SET = (dir, initial, hash = '', allPageName = [])=>{
  event.preventDefault()
  //
  //
  // let allPageName = []

  group = (tags, obj = {})=>{
    for (const tag of tags) {
      const tagName = tag.tagName
      if (!obj[tagName]) obj[tagName] = { name:tagName, pages: [], pageNames: [] }
      obj[tagName].pages.push(tag)
      obj[tagName].pageNames.push(tag.getAttribute("pageName"))
    }
    return obj
  }
  allPageName = document.querySelectorAll('[pageName]')
  const pageNames = group(allPageName)

  for (page of Object.keys(pageNames)) _PAGE_DISPLAY(pageNames[page])

  for (const component of _COMPONENTS_STORED_GLOBALLY) {
    let componentPages = component.shadowRoot.querySelectorAll('[pageName]')
    if (componentPages.length > 0) {
      const cPageNames = group(componentPages)
      for (page of Object.keys(cPageNames)) _CPAGE_DISPLAY(cPageNames[page], component.shadowRoot)
      if (dir) {
        for (endp of dir.split('/')) {
          for (page of Object.keys(cPageNames)) {
            if (cPageNames[page].pageNames.includes(endp)) {
              console.log(': ',cPageNames[page].pageNames.includes(endp))
              _CPAGE_DISPLAY2(cPageNames[page], component.shadowRoot, endp)
            }
          }
        }
      }
    }
  }

  if (dir) {
    for (page of dir.split('/')) {
      _PAGE_DISPLAY(page, 'true')
      hash += '/' + page
    }
    _OLD_HASH = hash.slice(1)
    window.location.href = '#' + hash.slice(1)
    if (!initial) _UPDATE_COMPONENTS(hash)
  }

  // console.log('allPageName: ',allPageName)
  // for (const tag of allPageName) {
  //   const tagName = tag.tagName
  //   console.log('tagName: ',tagName)
  //   if (!pageNames.tagName) pageNames[tagName] = tag
  // }

  //
  //
  // let active = document.querySelectorAll('[activePage]')
  // for (page of active) _PAGE_DISPLAY(page.getAttribute('pageName'))
  // // console.log('dir, initial, active: ',dir, initial, active)
  // if (dir) {
  //   for (page of dir.split('/')) {
  //     _PAGE_DISPLAY(page, initial)
  //     hash += '/' + page
  //   }
  //   _OLD_HASH = hash.slice(1)
  //   window.location.href = '#' + hash.slice(1)
  //   if (!initial) _UPDATE_COMPONENTS(hash)
  // }
}

_CPAGE_DISPLAY2 = (page, component, dir)=>{
  for (var i = 0; i < page.pages.length; i++) { // iOS does not like (i of arr) here... for some reason
    if (dir === page.pages[i].getAttribute('pageName')) {
      page.pages[i].setAttribute('style', 'display: initial;')
    } else {
      page.pages[i].setAttribute('style', 'display: none;')
    }
  }
}

_CPAGE_DISPLAY = (page, component)=>{
  for (var i = 0; i < page.pages.length; i++) { // iOS does not like (i of arr) here... for some reason
    if (page.pages[i].getAttribute('activePage') === 'true') {
      page.pages[i].setAttribute('style', 'display: initial;')
    } else {
      page.pages[i].setAttribute('style', 'display: none;')
    }
  }
  // const pageGroup = active ? component.querySelector("[pageName='"+page+"']").tagName : page.name
  // const pages = active ? component.getElementsByTagName(pageGroup) : page.pages
  // for (var i = 0; i < pages.length; i++) { // iOS does not like (i of arr) here... for some reason
  //   if (!active && pages[i].getAttribute('activePage') === 'true') {
  //     pages[i].setAttribute('style', 'display: initial;')
  //   } else if (active && page === pages[i].getAttribute('pageName')) {
  //     pages[i].setAttribute('style', 'display: initial;')
  //   } else {
  //     pages[i].setAttribute('style', 'display: none;')
  //   }
  // }
}

_PAGE_DISPLAY = (page, active)=>{
  if (!document.querySelector("[pageName='"+page+"']")) { return }
  const pageGroup = active ? document.querySelector("[pageName='"+page+"']").tagName : page.name
  const pages = active ? document.getElementsByTagName(pageGroup) : page.pages
  for (var i = 0; i < pages.length; i++) { // iOS does not like (i of arr) here... for some reason
    if (!active && pages[i].getAttribute('activePage') === 'true') {
      pages[i].setAttribute('style', 'display: initial;')
    } else if (active && page === pages[i].getAttribute('pageName')) {
      pages[i].setAttribute('style', 'display: initial;')
    } else {
      pages[i].setAttribute('style', 'display: none;')
    }
  }
}

// _PAGE_DISPLAY = (page, /*initial*/)=>{
//   pageGroup = document.querySelector("[pageName='"+page+"']")
//   pages = document.getElementsByTagName(pageGroup.tagName)
//   for (var i = 0; i < pages.length; i++) { // iOS does not like (i of arr) here... for some reason
//     const state = pages[i].getAttribute('activePage')
//     if (page === pages[i].getAttribute('pageName') && state !== 'false') {
//     // if (page === pages[i].getAttribute('pageName') && state === 'true') {
//     // if (page === pages[i].getAttribute('pageName')) {
//     // if (state === 'true') {
//       pages[i].setAttribute('style', 'display: initial;')
//     } else {
//       pages[i].setAttribute('style', 'display: none;')
//       if (state === 'false') pages[i].setAttribute('activePage', '')
//     }
//   }
// }

_UPDATE_COMPONENTS = (hash)=>{
  for (const component of _COMPONENTS_STORED_GLOBALLY) {
    component.setAttribute('directory', hash)
  }
}

window.onhashchange = function() {
  const hash = window.location.hash.split('#')[1]
  if (_OLD_HASH !== hash) _PAGE_SET(hash)
}

_GO_BACK = ()=>{ window.history.back() }
