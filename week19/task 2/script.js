const createHtml = (post) =>{
    return `<li>
            <section>
                <h3>Заголовок: ${post.title}</h3>
                <p>Статья: ${post.body}</p>
            </section>
        </li>`
}

const inputTitle = document.getElementById('title-input');
const inputText = document.getElementById('text-input');
const btn = document.querySelector('.btn');
const postsContainer = document.querySelector('.posts');
const newPostsContainer = document.querySelector('.newPosts');

const innerHtmlPost = (arr,elem) =>{
    elem.innerHTML = arr.join(' ')
}

const getPosts = async() =>{
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=15')
        const data = await response.json()
        const htmlPosts = data.map(elem => createHtml(elem))
        innerHtmlPost(htmlPosts,postsContainer)
    } catch (error){
        console.error('Ошибка при получении постов: ' + error)
    }
}

getPosts()

// 1 вариант

// btn.addEventListener('click', async function(){
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
//         method: "POST",
//         body: JSON.stringify({
//             title: `${inputTitle.value}`,
//             body: `${inputText.value}`,
//             userId: 1
//         }),
//         headers: {
//             "Content-type": "application/json; charset=UTF-8"
//         }
//     })
//     const newPost = await response.json()
//     const htmlNewpost = createHtml(newPost)
//     newPostsContainer.innerHTML += htmlNewpost
//     inputText.value = ''
//     inputTitle.value = ''
//     } catch (error){
//         console.error('Ошибка при создании постов: ' + error)
//     }
// })

// 2 вариант

btn.addEventListener('click', ()=> {
    fetch('https://jsonplaceholder.typicode.com/posts',{
    method: "POST",
    body: JSON.stringify({
            title: `${inputTitle.value}`,
            body: `${inputText.value}`,
            userId: 1
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
})
.then(response => response.json())
.then(data =>{
    const newPost = createHtml(data);
    newPostsContainer.innerHTML += newPost;
    inputText.value = '';
    inputTitle.value = '';
    })
.catch(error => console.error('Ошибка при создании постов: ' + error))
})
