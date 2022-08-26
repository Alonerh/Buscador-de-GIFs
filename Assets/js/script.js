// url Async requesting function
function httpGetAsync(theUrl, callback)
{
    // create the request object
    var xmlHttp = new XMLHttpRequest();

    // set the state change callback to capture when the response comes in
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }
    // open as a GET call, pass in the url and set async = True
    xmlHttp.open("GET", theUrl, true);
    // call send with no params as they were passed in on the url string
    xmlHttp.send(null);
    return;
}
// callback for the top 8 GIFs of search
function tenorCallback_search(responsetext)
{
    // parse the json response
    var response_objects = JSON.parse(responsetext);
    top_10_gifs = response_objects["results"];
    // load the GIFs -- for our example we will load the first GIFs preview size (nanogif) and share size (tinygif)
    console.log(top_10_gifs)
    var html = '';
    var index = 0;
            for(var i in top_10_gifs){
                html += '<div class="col-md-4"><div class="filme"><img src="'+top_10_gifs[index]["media"][0]["nanogif"]["url"]+''+top_10_gifs[index].title+'"></div></div>';
                index++;
                console.log(index)
            }
            $('.filmes').html(html);
    return;
}
// function to call the trending and category endpoints
function grab_data()
{
    setInterval(()=>{
        // set the apikey and limit
        var apikey = "LIVDSRZULELA";
        var lmt = 21;

        // test search term
        var search_term = document.querySelector('input').value;
        // using default locale of en_US
        var search_url = "https://g.tenor.com/v1/search?q=" + search_term + "&key=" +
                apikey + "&limit=" + lmt;
        httpGetAsync(search_url,tenorCallback_search);
        // data will be loaded by each call's callback
        return;
    }, 2000)
}
// SUPPORT FUNCTIONS ABOVE
// MAIN BELOW
// start the flow
grab_data();