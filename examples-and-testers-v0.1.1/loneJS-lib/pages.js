var _OLD_HASH = window.location.hash.split('#')[1]

document.onreadystatechange = ()=>{
  if (document.readyState === 'complete') {
    _PAGE_SET(window.location.hash.split('#')[1], true)
  }
}

_PAGE_SET = (dir, initial, hash = '', pageGroups = {})=>{
  if (event) event.preventDefault()

  group = (tags)=>{
    for (const tag of tags) {
      const tagName = tag.tagName
      if (!pageGroups[tagName]) pageGroups[tagName] = { name:tagName, pages: [], pageNames: [] }
      pageGroups[tagName].pages.push(tag)
      pageGroups[tagName].pageNames.push(tag.getAttribute("pageName"))
    }
  }

  const allPageName = document.querySelectorAll('[pageName]')
  group(allPageName)

  for (const component of _COMPONENTS_STORED_GLOBALLY) {
    let componentPages = component.shadowRoot.querySelectorAll('[pageName]')
    if (componentPages.length > 0) {
      group(componentPages)
    }
  }

  for (page of Object.keys(pageGroups)) _PAGE_DISPLAY(pageGroups[page])

  if (dir) {
    for (page of dir.split('/')) {
      for (group of Object.keys(pageGroups)) {
        if (pageGroups[group].pageNames.includes(page)) {
          _PAGE_DISPLAY(pageGroups[group], page)
        }
      }
      hash += '/' + page
    }
    _OLD_HASH = hash.slice(1)
    window.location.href = '#' + hash.slice(1)
    if (!initial) _UPDATE_COMPONENTS(hash)
  }

}

_PAGE_DISPLAY = (page, dir)=>{
  for (var i = 0; i < page.pages.length; i++) { // iOS does not like (i of arr) here... for some reason
    if (dir === page.pages[i].getAttribute('pageName')) {
      page.pages[i].setAttribute('style', 'display: initial;')
    } else if (!dir && page.pages[i].getAttribute('activePage') === 'true') {
      page.pages[i].setAttribute('style', 'display: initial;')
    } else {
      page.pages[i].setAttribute('style', 'display: none;')
    }
  }
}

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
