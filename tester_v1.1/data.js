var _DATA = {
  landing: {
    title: 'Landing Page!',
    subTitle: '&bull; This page is set as the activePage in index.html'
      +'&#10; &bull; If not endpoint is specified, this page will show by default.'
      +'&#10; &bull; OR: if only the the "PAGE-MAIN" group is specified: /#home.',
    endpoint: '/#home/landing',
  },
  page2: {
    title: 'Page 2',
    subTitle: '&bull; Data written in data.js file and served into component in index.html'
      +'&#10; &bull; Also: this page is a duplicate of the landing page component.'
      +'&#10; &bull; Visit the data.js file to find this text.',
    endpoint: '/#home/page2',
  },
  page3: {
    title: 'Page 3',
    subTitle: '&bull; In this page we have created another page group within this component'
      +'&#10; &bull; As an example, these endpoints were not set with an activePage'
      +'&#10; &bull; Click one of the buttons to see page contents & the updated url'
      +'&#10; &bull; If the endpoint was not specified in the url, it will not show when you come to this page',
    endpoint: '/#home/page3',
  },
  login: {
    title: 'Login Page',
    endpoint: '/#login',
  },
  myJsonAPI: {},
}
