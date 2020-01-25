document.addEventListener("DOMContentLoaded", ()=>{

    let allPost = document.querySelector("#allPost")
    console.log(allPost)
    allPost.addEventListener("submit", (event)=>{
        event.preventDefault()
        getAllPost()
    })
    const getAllPost = async()=>{
        let response = await axios.get("http://localhost:3000/posts/all")
        let posts = response.data.posts
        let ul = document.querySelector("ul")
        posts.forEach(el=>{
            let li = document.createElement("li")
            li.innerText = el.body
            ul.appendChild(li)
        })
    }
    
})