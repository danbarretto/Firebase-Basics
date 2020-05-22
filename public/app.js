document.addEventListener('DOMContentLoaded', (event) => {
  const app = firebase.app()
  const db = firebase.firestore()
  const myPost = db.collection('posts').doc('myFirstPost')

  myPost.onSnapshot((doc) => {
    const data = doc.data()
    const div = document.createElement('div')
    div.innerHTML = `<br>${data.title} <br> ${data.createdAt}`
    document.body.appendChild(div)
    document.getElementById('cool').innerText = data.title
  })


  const productsRef = db.collection('products')
  const query = productsRef.where('price', '>=', 5)

  query.get()
  .then(products=>{
      products.forEach(doc=>{
          const data = doc.data()
          const div = document.createElement('div')
          div.innerHTML = `<br>${data.name} .... R$${data.price}`

          document.body.appendChild(div)
      })
  })
})

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider()

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user
      document.write(`Hello ${user.displayName}`)
      console.log(user)
    })
    .catch(console.log)
}

function updatePost(e) {
  const db = firebase.firestore()
  const myPost = db.collection('posts').doc('myFirstPost')
  myPost.update({ title: e.value })
}
