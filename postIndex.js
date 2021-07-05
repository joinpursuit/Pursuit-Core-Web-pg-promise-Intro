document.addEventListener("DOMContentLoaded", ()=>{

    let allPost = document.querySelector("#allPost")
    let ul = document.querySelector("#bodyPost");
    let numberPost = document.querySelector("#numberPost")
    let getANewPost = document.querySelector("#newPost")

    getANewPost.addEventListener("submit", (event)=>{
        event.preventDefault()
        newPost()
    })
    allPost.addEventListener("submit", (event)=>{
        event.preventDefault()
        getAllPost()
    })

    const getAllPost = async()=>{
        let response = await axios.get("http://localhost:3000/posts/all")
        let posts = response.data.posts
        ul.innerHTML=""
        
        posts.forEach(el=>{
            getPostLikes(el.id)
            let li = document.createElement("li")
            li.innerText = el.body
            li.id=el.id
            ul.appendChild(li)
        })
    }

    const getPostLikes = async(id)=>{
        let response = await axios.get(`http://localhost:3000/likes/post/${id}`)
        let NumOfLikes ="Post ID: "+id+ " have "+Number(response.data.postByLike.length) + " likes"
        let li = document.createElement("li")
        li.innerText = NumOfLikes
        numberPost.appendChild(li)
        
        }

    
    let allPostByUser = document.querySelector("#allPostByUser")

    allPostByUser.addEventListener("submit", (event)=>{
        event.preventDefault()
        getAllPostsByUser(event.target.elements[0].value)
    })

    const getAllPostsByUser = async(userID)=>{
        let response = await axios.get(`http://localhost:3000/posts/${userID}`)
        let allPosts =response.data.postsByUser
        ul.innerHTML=""

        allPosts.forEach(el=>{
            let li = document.createElement("li")
            li.innerText = el.body
            ul.appendChild(li)
        })
        
    }
    const newPost = async()=>{
       let posterId = document.querySelector("#posterId")
       let bodyText= document.querySelector("#body")
       let response= await axios.post("http://localhost:3000/posts/register",{poster_id:posterId.value, bodyText:bodyText.value})
        let postNew = response.data.post
        ul.innerHTML = ""
        let li = document.createElement("li")
        li.innerText = postNew.body
        ul.appendChild(li)
    }

    const getAllUserID = async()=>{
        let response = await axios.get("http://localhost:3000/users/all")
        let user = response.data.users
        let userList = document.querySelector("#userList")
        user.forEach(el=>{
            // debugger
            let option = document.createElement("option")
            option.innerText = el.id
            option.value = el.id
            userList.appendChild(option)
        })
    }

    getAllUserID()    
})