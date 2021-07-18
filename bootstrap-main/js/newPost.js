let articleId = -1
 firebase.database().ref("/articles")
 .orderByChild("dateAdded")
 .limitToLast(1)
 .on("child_added", (snapshot) =>{
     console.log(snapshot.key)
     articleId = snapshot.key
     let value = snapshot.val()
     $("#container").html(value.textDetail)
 })

    const savePost = postData => {
        
        $.ajax({
            method:"PUT",
            url:`https://kodemia-12g-firestore-default-rtdb.firebaseio.com/articles/${parseInt(articleId) + 1}.json`,
            data: JSON.stringify(postData),
            success: response => {
                console.log( response )
            },
            error: error => {
                console.log( "hay un error ")
                console.log( error )
            },
            async:false
        })
    } 

    const getLatestPost = getData => {
        $.ajax({
            method:"GET",
            url:"https://kodemia-12g-firestore-default-rtdb.firebaseio.com/articles/articles.json",
           // data: JSON.stringify(postData),
            success: response => {
                console.log( response )
            },
            error: error => {
                console.log( "hay un error ")
                console.log( error )
            },
            async:false
        })
    } 

const printPost = (postData) =>{

    for (key in postData){ 

   let {coverImage, postTitle, postHash, secondImage, textPost} = postObject[key]

    let postHtml = `
				<div class="card">
					<img src="${coverImage}"
						alt="React Libraries To Use In 2021: 15 Top Picks">
					<div class="card-body">
						<h1 class="card-text font-weight-bold">${postTitle}</h>
					</div>
					<div class="pl-4">
						<button class="btn-card-2 text" type="button">#${postHash}</button>
						
					</div>
					<div class="card-format pt-3 pl-4">
						<img class="${secondImage}"
							alt="yash tiwari"><span>Alfredo Pizana <span class="date-txt">Jun 13 - 7 min read</span></span>
						<div class="card-text">
							<p class="card-txt-2 mt-3">${textPost}</p> `
    }

$(".container-xl").append(postHtml)

}
 
$("#publish-post").click(() => {

    let coverImage = $("#cover-image").val()
    let postTitle = $("#post-title").val()
    let postHash = $("#post-hash").val()
    let secondImage = $("#second-image").val()
    let textPost = $("#post-text").val()
    var text = $("#editor .ql-editor").html();
    let textDetail = text

    let postObject = {coverImage, postTitle, postHash, secondImage, textPost, textDetail}

    savePost(postObject)

})