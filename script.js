let allposts=[];
var output=document.getElementById("postDiv");

    axios.get("https://jsonplaceholder.typicode.com/todos")
    .then(function (response){
         // console.log(response.data);
            allposts=response.data;
            output.innerHTML= allposts.map(user => `
            <div class="col-4 m-1 border border-light card mx-auto">
            <div class="card-body">
            <p class="card-title">ID: ${user.id}</p>
            <p class="card-title">Title: ${user.title}</p>
            <p >Completed: ${user.completed}</p>
            <button onclick=editepost(${user.id})>Edit</button>
            <button onclick=deletepost(${user.id})>Delete</button>
            </div>
            </div> 
            `
            )
       
    })
    
    .catch(function (error){
        //handle error
        console.log(error);
    })

    document.getElementById("btn").addEventListener("click",addData);

    function addData(){
        let title=document.getElementById("title").value;
        let completed=document.querySelector('input[name="r1"]:checked').value;
        
        url=`https://jsonplaceholder.typicode.com/todos`
        data={title:title,completed:completed}
        const config={
            headers:{
            'Content-Type':'application/json'
            }
        }
        axios.post(url,data,config)
        .then((res)=>{
            allposts.push(res.data);
            output.innerHTML="";
            output.innerHTML= allposts.map(user => `
            <div class="col-4 m-1 border border-light card mx-auto">
            <div class="card-body">
            <p class="card-title">ID: ${user.id}</p>
            <p class="card-title">Title: ${user.title}</p>
            <p >Completed: ${user.completed}</p>
            <button onclick=editepost(${user.id})>Edit</button>
            <button onclick=deletepost(${user.id})>Delete</button>
            </div>
            </div> `
            )
        }).catch((error)=>{
            console.log(error);
        })

    }


    function deletepost(id){     
        allposts=allposts.filter(val=>val.id!=id);
        //console.log(arr1);
        output.innerHTML='';
        
        allposts.forEach(user=>{
          output.innerHTML+=`
          <div class="col-4 m-1 border border-light card mx-auto">
          <div class="card-body">
          <p class="card-title">ID: ${user.id}</p>
          <p class="card-title">Title: ${user.title}</p>
          <p >Completed: ${user.completed}</p>
          <button onclick=editepost(${user.id})>Edit</button>
          <button onclick=deletepost(${user.id})>Delete</button>
          </div>
          </div>  `
        
        })
     
    }

    function editepost(id){
        axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(function (response){
            let title=response.data.title;
            let completed=response.data.completed;
            document.getElementById("title").value=title;
            if(completed==true){
                document.getElementById("radio1").checked="checked";  
            }
            else if(completed==false){
                document.getElementById("radio2").checked="checked"; 
            }
        })
        .catch(function (error){
            //handle error
            console.log(error);
        })


        document.getElementById("btn1").addEventListener("click",makerequest);
        function makerequest(e){
        e.preventDefault()
        let title=document.getElementById("title").value;
        let completed=document.querySelector('input[name="r1"]:checked').value;
        url=`https://jsonplaceholder.typicode.com/todos/${id}`
        data={title:title,completed:completed}
        const config={
            headers:{
            'Content-Type':'application/json'
            }
        }
        axios.put(url,data,config)
        .then((res)=>{
            console.log(res.data)
            let allpostsindex= allposts.findIndex((user) => user.id==res.data.id);
            allposts[allpostsindex]={id:res.data.id, title:res.data.title,completed:res.data.completed};
            output.innerHTML="";
            output.innerHTML= allposts.map(user => `
            <div class="col-4 m-1 border border-light card mx-auto">
            <div class="card-body">
            <p class="card-title">ID: ${user.id}</p>
            <p class="card-title">Title: ${user.title}</p>
            <p >Completed: ${user.completed}</p>
            <button onclick=editepost(${user.id})>Edit</button>
            <button onclick=deletepost(${user.id})>Delete</button>
            </div>
            </div> `
            )        })
        .catch((error)=>{
            console.log(error);
        })
    } 
}