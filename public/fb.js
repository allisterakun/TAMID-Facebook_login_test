function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
        testAPI();
    } else {                                 // Not logged into your webpage or we are unable to tell.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this webpage.';
    }
}


function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function(response) {   // See the onlogin handler
        statusChangeCallback(response);
    });
}


window.fbAsyncInit = function() {
    FB.init({
        appId      : '242170703879114',
        cookie     : true,                     // Enable cookies to allow the server to access the session.
        xfbml      : true,                     // Parse social plugins on this webpage.
        version    : 'v8.0'           // Use this Graph API version for this call.
    });

    FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
        statusChangeCallback(response);        // Returns the login status.
    });
};

function fbSdkPromise(endpoint) {
    return new Promise((resolve, reject) => FB.api(endpoint, resolve));
}

// function that runs when you log in
async function testAPI() {
    const { name, id } = await fbSdkPromise('/me');
    const { data: postsOnWall } = await fbSdkPromise('/me/feed');
    const groups = await fbSdkPromise(`/${id}/groups`);

    // name
    console.log(`User name: ${name}, id: ${id}`);

    // getting posts in groups
    // groups list
    // need admin permission on FB app to add it to a group (which is required)
    // need to add to every group that they want to use
    // need approval for groups api (see note @ https://developers.facebook.com/docs/graph-api/reference/user/groups/)
    console.log(`Groups: ${JSON.stringify(groups)}`)

    // posts on wall
    console.log(`User posts: ${postsOnWall}`);

    // print permissions
    const { data: perms } = await fbSdkPromise(`/${id}/permissions`);
    console.log('permissions', perms);

    // get profession
    const data = await fbSdkPromise(`/${id}`);
    console.log('user data', data);

    // profession
    // need workplace account

    return {
        name: name,
        posts: postsOnWall
    };
}

async function saveFBDetails() {
    const data = await testAPI();

    const response = await fetch('/savedetails', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

// eww
setTimeout(() => {
    document.querySelector('#log-out').addEventListener('click', () => {
        FB.logout(res => {
            checkLoginState();
        });
    });
    document.querySelector('#save').addEventListener('click', saveFBDetails);
}, 100);