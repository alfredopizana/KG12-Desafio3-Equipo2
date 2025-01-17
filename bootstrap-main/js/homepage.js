const database = firebase.database()



//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//var user = randomUsers[getRandomInt(randomUsers.length)]

database.ref("/articles").on("value",snapshot=>{
    const articles = snapshot.val()
    console.log(articles)
    //featured-post-card
    var articleFeedContainer = $("#nav-feed")
    for(articleId  in articles){
        let template = createArticleTemplate(articles[articleId],articleId)
        articleFeedContainer.prepend(template)
    }
})



const createArticleTemplate = (article,aritcleId) => {
    let {comments_count=0, cover_image="", description="", published_at="" ,devToId = -1 || id ,tag_list=[] ,tags="" ,title="" ,user={} } = article
    let articleTemplate = `
    <div class="card br-post post-card featured-post-card mb-3">
        <img src="${cover_image}" class="card-img-top" alt="...">
        <div class="card-body">
            <div class="d-flex c-header">
                <img src="${user.profile_image_90}" alt="" class="br-100">
                <div class="d-flex c-name">
                    <h6 class="nickname mb-0">${user.name}</h6>
                    <p>Jun 12</p>
                </div>
            </div>
            <div class="card-content pl-5 pt-2">
                <a href="postDetail.html?articleId=${aritcleId}&devToId=${devToId}" class="post-list">
                    <h4 class="card-title">${title}</h4>
                </a>
                <div class="d-flex h-order">
                    <nav class="card-post-tags">
                        ${ tag_list.map(text => `<a>#${text}</a>`).join("") }
                    </nav>
                </div>
                <div class=" d-flex read">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" role="img"
                            aria-labelledby="aavwx5vmqdgx8wvzfg593jo469ge3dnz"
                            class="crayons-icon mb-1">
                            <title id="aavwx5vmqdgx8wvzfg593jo469ge3dnz">
                                Comments</title>
                            <path
                                d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z">
                            </path>
                        </svg>
                        <button class="comment">Add comment</button>
                    </div>
                    <div class="d-flex">
                        <p class="card-text mb-0"><small class="text-muted">7
                                min read</small></p>
                        <button class="save">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    return articleTemplate
}
console.log(database)