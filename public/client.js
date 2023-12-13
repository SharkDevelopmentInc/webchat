/*For Markdown: https://jsfiddle.net/cgLwyskq/3/*/
// Do a thing where it shows what room ur in in the userlist thingy
/*
Good colors:
#8E0DC2 (purple)
#0DC268 (green)
#FFBD00 (yellow)
#FFB3D7 (pink)
#7070FF (blue) 
#CC5500 (red)
#BC0064 (maroon)
#6ABC00 (light green)
#009BBC (cyan)
*/
/*https://sweetalert2.github.io/*/
$(async function() {
  // get admins
  var adminColor = 'dodgerBlue';
  const admins = await fetch("/admins.json").then(data => data.json()).then(res => res.admins);
  // conveniently edit taskbar info, even if its messy
  var version = '1.5';
  var whatsNew = `
    - Message display overhaul!!<br>
    - Added emojis<br>
    - Added themes<br>
    - Fixed VC bugs<br>
    - Fixed admin Login issues<br>
    - Added a suggestion form<br>
    - Fixed /update command<br>
    - Fixed Slomode bugs<br>
    - Add custom user colors<br>
    - Added /kick command<br>
    - Fixed "not typing" bugs<br>
    - Added auto join for admins<br>
    - Added GIFS!!!<br>
    - Added when you type, it fills the message box.<br><br>
    Thanks for using the chatroom :D
    `;
  var info = `
  <a href="https://the-ramenator.github.io" target="_blank">Other Projects</a>
  <br>
  <span id="suggest" style="color:#663366;text-decoration:underline;cursor: pointer;">Suggestion Form</span><br>
  <span id="newstuff" style="color:#663366;text-decoration:underline;cursor: pointer;">What\'s New</span>
  <br><br>
  Admins:  `+ admins.map(adm => adm.name).toString().split(',').join(', ') + `  
  <br><br>
  Enter "/cmds" to see a list of commands.
  <br>
  Type "@" before a username to send a notification! ('@username')
  <br>
  Paste an image on your clipboard (while focusing on the input box) to send an image.
  <br><br>
  If you find a bug, make sure to contact me by adding a comment to the repl's spotlight page.
  `

  $('#tbinfo').html('<!--<div id="updates">' + whatsNew + '<br></div>--><br><div id="misc">' + info + '</div><notice id="tbNotice" class="vue"></notice>');
$( "#settings2" ).click(function() {
  showSettings();
});

  // change audio file volume 
  $('#notif2').prop('volume', 0.2);

  $("#gameButton").on('click', function() {
    coolTransition({
      element: "#game",
      visibility: "show"
    });
  });
  $("#game span").on("click", function() {
    coolTransition({
      element: "#game",
      visibility: "hide"  
    });
  });
  $('#suggest').on('click', function() {
    // open suggestions form
    Swal.fire({
      html: `<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdcpYs8sWOXzYycebvSiIhhIgaGkorjMgiqbR3fc-HyQORGCQ/viewform?embedded=true" width="640" height="543" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>`,
      width: '800px'
    });
  });
  $('#newstuff').on('click', function() {
    // open suggestions form
    Swal.fire({
      title: 'What\'s New In Update '+version+'?',
      html: `<p>`+whatsNew+`</p>`,
      width: '800px'
    });
  });
  function showRules() {
    // open rules display
    Swal.fire({
      title: 'Rules',
      html: `<rules style="list-style-type: &quot;👉&quot;;text-align:left;"><li> Don't use slurs.</li><li> Don't try to abuse any exploits.</li><li> Don't spam.</li><li> Use common sense.</li></rules><br>`,
      icon: 'info',
      width: '35%'
    })
  }
  function showFaq() {
    // open FAQ display
    Swal.fire({
      title: 'FAQ',
      html: `Q: <i>Who created this?</i><br>A: Who knows? I don't.. do you?<br><br>Q: <i>Why was this created?</i><br>A: This was created simply for fun!<br><br>Q: <i>How can I submit a suggestion?</i><br>A: There is a suggestion form in the webchat's taskbar.`,
      icon: 'info',
      width: '30%'
    })
  }

  function showInfo() {
    // show info display
    Swal.fire({
      title: 'Credit',
      html: `Created with <a href="https://repl.it" target="_blank">repl.it's amazing software</a><br>Created by @The Ramenator. Original testers were:  @Շђєรɭ๏Շђ๒๏ץ, 𝕿𝖊𝖈𝖍𝖓𝖔, 𝕻𝖗𝖔𝕮𝖗𝖔𝖜, and 𝕾𝖔𝖈𝖐𝖘𝕿𝖍𝖊𝕰𝖈𝖔𝖓𝖔𝖒𝖎𝖈𝖘𝕸𝖆𝖓. Find more projects by me <a href="https://the-ramenator.github.io/" target="_blank">here</a>!<br><br><cred style="text-align:left;"><span style="position:relative;color:red;float:left;">`,
      icon: 'info',
      width: '40%'
    })
  }
  var modal2 = document.getElementById("settings");
modal2.style.display="none";
  function showSettings() {
    modal2.style.display = "block";
  }
  function playId(id) {
    document.getElementById(id).play();
    document.getElementById(id).currentTime = 0;
  }
  // PROBELMS WITH LOGGING IN!!
  const letters = ['a','A','b','B','c','C','d','D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k', 'K', 'l', 'L', 'm', 'M', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 't', 'T', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z', ' ', '_', '-', '+', '=', '?', '/', '|', ')', '(', '*', '&', '^', '%', '$', '#', '@', '!', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '~', '.', ',', 'Tab', 'Space']
document.addEventListener('keydown', (event) => {
  var leekey = event.key;
if(document.getElementById('myModal').style['display'] == 'none'){
  if(letters.includes(leekey)){
    var m = document.getElementById('m');
    var entroom = document.getElementById('entroom');
    var tagAcc = document.getElementById('tagAcc');
    var userAcc = document.getElementById('userAcc');
    var gifInput = document.getElementById('gif-input');
    if (m === document.activeElement || entroom === document.activeElement || tagAcc === document.activeElement || userAcc === document.activeElement || gifInput === document.activeElement || leekey == "c"){
      // Ignore
    }
    else{
      document.getElementById('m').focus();
    }
  }      
}
  else{
  }
}, false);

  var shades = document.querySelectorAll('.backgrounds-shade');
  function coolTransition(prop) {
    shades.forEach(function(i) {
      setTimeout(function() {
        i.style.visibility = "visible";
        i.style.transform = "scaleX(1) scaleY(1)";
      }, 300 * Math.random());
    });
    setTimeout(function() {
      if (prop.visibility === "show") $(prop.element).show();
      else if (prop.visibility === "hide") $(prop.element).hide();
      shades.forEach(function(i) {
        i.style.transform = "scaleX(0) scaleY(1)";
      });
    }, 1500);
    setTimeout(function() {
      shades.forEach(function(i) {
        i.style.transition = "all 0ms linear";
        i.style.transform = "scaleX(1) scaleY(0)";
      });
    }, 2500);
    setTimeout(function() {
      shades.forEach(function(i) {
        i.style.visibility = "hidden";
        i.style.transition = "";
      });
    }, 2600);
  }

  async function sendImage(file) {
    function compressImg() { return new Promise(resolve => {
      new Compressor(file, {
        quality: 0.3,
        maxWidth: 950,
        minWidth: 50,
        mimeType: 'image/webp',
        success(result) {
          resolve(result);
        },
        error(err) {
          console.log(err.message);
        },
      });
    });}
    var reader = new FileReader();
    reader.onload = function(e) {
      Swal.fire({
        title: 'Send an Image',
        input: 'textarea',
        inputLabel: (isPm ? 'Private Message' : 'Message'),
        inputPlaceholder: 'Type your message here...',
        inputAttributes: {
          onkeydown: "return !/^[<>]+$/ig.test(event.key)",
          onpaste: "noXSS(this)"
        },
        showCancelButton: true,
        imageUrl: e.target.result,
        imageAlt: 'image',
        confirmButtonText: 'Send',
      }).then((result) => {
        if (result.isConfirmed) {
          var img = Base64String.compress(e.target.result.split('base64,')[1]);
          var msg = result.value + ' <br> <img>';
          if (isPm){ // private message
            
            socket.emit('pm', pmUser, msg, img);
          }
          else if (admin){
            if(document.getElementById('userColor').value == "#000000"){
                            document.getElementById('userColor').value = localStorage.getItem('userCol');

            }
            else{
            adminColor = document.getElementById('userColor').value;
                            localStorage.removeItem('userCol'); localStorage.setItem('userCol',document.getElementById('userColor').value)

            }
            const d2 = new Date();

                        var date2 = d2.getHours()+':'+d2.getMinutes()+':'+d2.getSeconds()+' ';

            socket.emit('admin message', `<span class="date">`+date2+`</span>`+tag + username + ' : ' + msg, adminColor, img);
          }
          else{
                      var coloors = document.getElementById('userColor');
            if (!document.getElementById('userColor')){
              coloors = "#000000";
            }
            else{
              coloors = document.getElementById('userColor').value;
            }
            const d2 = new Date();
            var date2 = d2.getHours()+':'+d2.getMinutes()+':'+d2.getSeconds()+' ';

            socket.emit('chat message',`<span class="date">`+date2+`</span><a style="color: `+coloors+`;">`+ tag + username +'</a>'+' : ' + msg, img);
          }
        }
      });
    }
    var file = await compressImg();
    reader.readAsDataURL(file);
  }

  // prevent user from pasting "<>" (prevents html manipulation)
  window.noXSS = function(el) {
    setTimeout(function() {
      $(el).val($(el).val().replace(/[<>]+/gi, ''));
    });
  }

  $('#m').on('paste', async function() {
    noXSS('#m');

    // paste images (data url is 'e.target.result')
    var items = (event.clipboardData || event.originalEvent.clipboardData).items;
    for (var i in items) {
      item = items[i];
      if (item.kind === 'file') sendImage(item.getAsFile());
    }
  });

  $("#addImage").click(function() {
    Swal.fire({
      title: 'Attach an Image',
      input: 'file',
      showCancelButton: true,
      confirmButtonText: 'Attach',
    }).then(res => {
      var file = res.value;
      if (!file.type.includes("image")) {
        Swal.fire({
          icon: 'error',
          title: 'Well, this is awkward.',
          text: "Soo... you were supposed to send an image.",
          confirmButtonText: 'Send',
        });
      } 
      sendImage(file);
    });
  });

var modal = document.getElementById("gifs");
modal.style.display="none";
var btn = document.getElementById("addGif");
btn.onclick = function() {
  modal.style.display = "block";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}
        function getUserInput() {
            var inputValue = document
                .querySelector(".js-userinput").value;
            return inputValue;
        }
        document.querySelector(".js-go").addEventListener("click", function() {
            var inputValue = document.querySelector(".js-userinput").value;
            var userInput = getUserInput();
            searchGiphy(userInput);
        });
        document.querySelector(".js-userinput")
            .addEventListener("keyup", function(e) {

                // If the Key Enter is Pressed 
                if (e.which === 13) {
                    var userInput = getUserInput();
                    searchGiphy(userInput);
                }
            });        function searchGiphy(searchQuery) {
            var url =
                "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" +
                searchQuery;

            // AJAX Request

            var GiphyAJAXCall = new XMLHttpRequest();
            GiphyAJAXCall.open("GET", url);
            GiphyAJAXCall.send();

            GiphyAJAXCall.addEventListener("load", function(data) {
                var actualData = data.target.response;
                pushToDOM(actualData);

            });
        }
        function pushToDOM(response) {

            // Turn response into real JavaScript object
            response = JSON.parse(response);

            // Drill down to the data array
            var images = response.data;

            // Find the container to hold the response in DOM
            var container = document.querySelector(".js-container");

            // Clear the old content since this function 
            // will be used on every search that we want
            // to reset the div
            container.innerHTML = "";

            // Loop through data array and add IMG html
            images.forEach(function(image) {

                // Find image src
                var src = image.images.fixed_height.url;
                
                // Concatenate a new IMG tag
                container.innerHTML += "<img class='gif-js' src='"+src+"' class='container-image' />";
            });
        }

  $(document).on('mouseover', '.gif-js', function () {
    this.classList.add("hover-gif-js");
    this.classList.remove("gif-js");
  })
  $(document).on('mouseout', '.hover-gif-js', function () {
    this.classList.add("gif-js");
    this.classList.remove("hover-gif-js");
  })
  $(document).on('click', '.hover-gif-js', function () {
    modal.style.display = "none";
    var id = document.getElementsByClassName('hover-gif-js')[0];
    var src = id.src;
    sessionStorage.clear();
    sessionStorage.setItem('gifurl',src);
          Swal.fire({
        title: 'Send a Gif',
        input: 'textarea',
        inputLabel: (isPm ? 'Private Message' : 'Message'),
        inputPlaceholder: 'Type your message here...',
        inputAttributes: {
          onkeydown: "return !/^[<>]+$/ig.test(event.key)",
          onpaste: "noXSS(this)"
        },
        showCancelButton: true,
        imageUrl: src,
        imageAlt: 'Gif',
        confirmButtonText: 'Send',
      }).then((result) => {
        if (result.isConfirmed) {
          var img = src;
          var msg = result.value + ' <br> <imggif>';
          if (isPm){ // private message
            socket.emit('pm', pmUser, msg, img);
          }
          else if (admin){
            if(document.getElementById('userColor').value == "#000000"){
                          adminColor = localStorage.getItem('userCol');
              document.getElementById('userColor').value = localStorage.getItem('userCol');

            }
            else{
            adminColor = document.getElementById('userColor').value;
                            localStorage.removeItem('userCol'); localStorage.setItem('userCol',document.getElementById('userColor').value)

            }
            const d2 = new Date();

                        var date2 = d2.getHours()+':'+d2.getMinutes()+':'+d2.getSeconds()+' ';

            socket.emit('admin message', `<span class="date">`+date2+`</span>`+tag + username + ' : ' + msg, adminColor, img);
          }
          else{
                      var coloors = document.getElementById('userColor');
            if (!document.getElementById('userColor')){
              coloors = "#000000";
            }
            else{
              coloors = document.getElementById('userColor').value;
            }
            const d2 = new Date();
            var date2 = d2.getHours()+':'+d2.getMinutes()+':'+d2.getSeconds()+' ';

            socket.emit('chat message',`<span class="date">`+date2+`</span><a style="color: `+coloors+`;">`+ tag + username +'</a>'+' : ' + msg, img);
          }
        }
      });
});
  $("#addEmoji").click(function() {
      Swal.fire({
      title: 'Emojis',
       position: 'top-end',
      /*imageUrl: 'https://raw.githubusercontent.com/the-ramenator/the-ramenator.github.io/main/assets/img/skull.png',
      imageWidth: 50,
      imageHeight: 50,*/
      confirmButtonText: 'Close',
          backdrop: `
    rgba(0,0,123,0.0)
    url("/nonexistent/image/directory/so/the/background/is/white.png")
    left top
    no-repeat`,
      html: `<div id="emojis">
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😃</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😞</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😀</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🙂</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😛</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😕</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😐</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😮</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🤔</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😭</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😂</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🤣</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😅</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🙃</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😉</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😊</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🥰</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🤓</span
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😍</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🥲</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🤑</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😶</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😑</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😏</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😒</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😬</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🤮</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🥵</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🥶</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🤯</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😎</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🧐</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😕</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🥺</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😱</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🥱</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🤬</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😤</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😡</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😠</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😩</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">😈</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">☠</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">💩</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🤡</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🧦</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">👻</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">👽</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">👾</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🙈</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">💯</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">👌</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">✌</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🤞</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">👍</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">👎</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🙏</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">💪</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🖕</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">👉</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🤨</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🤛</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🤜</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🧢</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🚫</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🤦‍♂️</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">👀</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🍆</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">🍑</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">💦</span>
      <span class="emoji" onclick="document.getElementById('m').value += this.innerHTML;document.getElementById('m').focus();">💀</span>
      </div>`,
    });
  });
  function closeFirstMenu() {
    coolTransition({
      element: "#myModal",
      visibility: "hide"
    });
  }
  function openFirstMenu() {
    coolTransition({
      element: "#myModal",
      visibility: "show"
    });
    setTimeout(function() {
      $('#logo').css('top', '25px');
    }, 1000);
  }

  // declare variables related to username and stuff
  var socket = io();
  var username;
  var tmpUsername;
  var noname;
  var admin = 0;
  var banned = 0;
  var pingcount = 0;
  var start = 0;
  var ping = 0;
  var vcid;
  var myStream;

  // voicechat stuff
  var peer = new Peer();
  peer.on('open', function(id) {
    vcid = id;
  });

  // mute button in vc menu
  $('#mute').on('click', function() {
    if (myStream.getTracks()[0].enabled) {
      $('#mute').html('mic_off');
    } else if (!myStream.getTracks()[0].enabled) {
      $('#mute').html('mic');
    }
    myStream.getTracks().forEach(track => track.enabled = !track.enabled);
  });

  // leave button for vc menu
  $('#leave').on('click', function() {
    try {
      call.close();
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: 'Error with leaving the call. ' + err
      });
    };
  });

  // detect if user is banned
  if (document.cookie.split(';').some((item) => item.includes('banned=1'))) {
    Swal.fire(
      'You are banned.',
      'If this is a mistake, you can get unbanned.',
      'error'
    );
    playId('e');
    id = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    username = 'BANNEDUSER' + id;
    socket.emit('adduser', username, 'banned');
    // $("#roomslist").css("visibility", "hidden");
    $("#roomslist").text("You are banned. You can\'t join any rooms. PM a moderator to get unbanned.");
    $('#nickname-input').prop('disabled', false);
    closeFirstMenu();
    banned = 1;
  }

  // prevent context menu actions in username input
  $('#nickname-input').on("cut copy paste", function(e) {
    e.preventDefault();
    Toast.fire({
      icon: 'error',
      title: 'Nice try, but no copy pasting'
    });
  });
  // open/close acc menu 
  $('body').on('click', function(e) {
    if (!$(e.target).closest('.acc').length) {
      $('#menuAcc').stop().animate({right: '1%', opacity: 0},function(){$(this).hide();});
    } else if ($('#menuAcc').css('opacity') == 0) {
      $('#menuAcc').stop().show().animate({right: '5%', opacity: 1});
    }
  });
  $('#openAcc').on('click', function() {
    if ($('#menuAcc').css('opacity') != 0) {
      $('#menuAcc').stop().animate({right: '1%', opacity: 0},function(){$(this).hide();});
    }
  });

  $('#menuAcc').on('keypress', '#tagAcc', function(e) {
    if ((e.keyCode || e.which) == '13') { 
      if ($('#tagAcc').val()) {
        tag = '[' + $('#tagAcc').val() + '] '
        Toast.fire({
          icon: 'success',
          title: 'You changed your tag to ' + $("#tagAcc").val()
        });
      } else {
        tag = '';
        Toast.fire({
          icon: 'success',
          title: 'You removed your tag'
        });
      }
    }
  });

    $('#menuAcc').on('keypress', '#userAcc', function(e) {
    if ((e.keyCode || e.which) == '13') {
      let userinput = $('#userAcc').val();
      let usercolore = $('#userColor').val();
      localStorage.removeItem('userCol');
      localStorage.setItem('userCol',usercolore);
      if (userinput) {
        // admin
        if (userinput.length > 38) {
          // no hackers.
          Swal.fire(
            'Nice try.',
            'You aren\'t special.',
            'error'
          );
          playId('e');
          tmpUsername = 'Sussy Amongus Imposter';
          adduser();
        } else if (userinput.toLowerCase().includes("server") || admins.includes(userinput.toLowerCase()) || userinput.toLowerCase().includes("halfcookedramen")) {
          // honka honka
          tmpUsername = '🤡';
          alert("You found an easter egg!")
          adduser();
        } else {
          tmpUsername = userinput;
          adduser();
        }
        noname = 0;
      } else {
        console.log('noname lol')
/*        id = Math.floor(Math.random() * (999 - 100 + 1) + 100);
        tmpUsername = 'USER' + id;
        adduser();
        noname = 1;*/
      }
    }
    function adduser() {
      // submit user to server
      tmpUsername = tmpUsername.trim().replace(/\s\s+/g, ' ');
      socket.emit('nameChange', tmpUsername, function nameTaken(taken) {
        if (taken === true) {
          // if requested username was already taken
          if (noname) {
            id = Math.floor(Math.random() * (999 - 100 + 1) + 100);
            tmpUsername = 'USER ' + id;
            adduser();
          } else {
            Swal.fire(
              'This name isn\'t allowed.',
              '"' + tmpUsername + '" is already being used. Please choose another username.',
              'error'
            );
            playId('e');
            $('#userAcc').val(username);
          }
        } else if (taken == 'e') {
          Swal.fire(
              'This name isn\'t allowed.',
              'Your username is already ' + tmpUsername,
              'error'
            );
          playId('e');
        } else {
          username = tmpUsername;
        }
      });
    }
  });

  // get ping
  start = Date.now();
  socket.emit('ping', function clientCallback() {
    ping = Date.now() - start;
    $('#ping').text('Ping: ' + ping + 'ms');
  });
  setInterval(function() {
    start = Date.now();
    socket.emit('ping', function clientCallback() {
      ping = Date.now() - start;
      $('#ping').text('Ping: ' + ping + 'ms');
    });
  }, 10000)

  // custom toast notif settings
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: () => {
      playId("n3");
    }
  });

  // hash security function
  String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length == 0) {
      return hash;
    }
    for (var i = 0; i < this.length; i++) {
      var char = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash;
  }
/*
https://the-ramenator.github.io/experiments/stringtohash
*/
/*        window.onbeforeunload = function() {
            myfun();
            return 'Are you sure you want to leave?';
        };

        function myfun() {
            console.log('hello');
        }*/
  // when you the idk username thing remember me

        if(!localStorage.getItem('remUser')){
      }
      else{
      let userinput = localStorage.getItem('remUser');
      if (userinput) {
        // admin
        if (userinput.charAt(0) == '!') {
          for (let i = 0; i < admins.length; i++) {
            var adm = admins[i];
            var encoded = CryptoJS.AES.encrypt(userinput, "replit");
            var decrypted = CryptoJS.AES.decrypt(encoded, "replit");
            if (decrypted == adm.password) {
              username = adm.name;
              adminColor = adm.color;
              var admCol;
              globalThis.admCol = adminColor;
              adminUser();
            }
          }
        } else if (userinput.length > 30) {
          // no hackers.
          Swal.fire(
            'Nice try.',
            'You aren\'t special.',
            'error'
          );
          playId('e')
          username = 'I\'m a Person Who Tried To Hack Lel || Kick Me Please';

          adduser();
        } else if (userinput.toLowerCase().includes("server") || admins.includes(userinput.toLowerCase()) || userinput.toLowerCase().includes("halfcookedramen")) {
          // honka honka
          username = '🤡';

          adduser();
        } else {
        if (userinput.includes("_") == true){
              e.preventDefault();
              Toast.fire({
              icon: 'error',
              title: 'Underscores aren\'t allowed'
    }); /*Change it to modal*/
        }
        else if (userinput.includes(" ") == true){
              e.preventDefault();
              Toast.fire({
              icon: 'error',
              title: 'Spaces aren\'t allowed'
    }); /*Change it to modal*/
        }
        else{
          username = userinput;
          admin = 0;

          adduser();
        }
        }
        noname = 0;
      } else {
        id = Math.floor(Math.random() * (999 - 100 + 1) + 100);
        username = 'USER' + id;
        admin = 0;
        adduser();
        noname = 1;
      }
    
    function adminUser() {
      // admin stuff
      admin = 1;
      document.getElementById('rememberforadmins').style.visibility = "visible"; 
      $("#m").attr('maxlength', '500');
      $('#menuAcc').html('<input id="tagAcc" maxlength="20" placeholder="tag"><input id="userAcc" onkeypress="return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 48 && event.charCode <= 57)" maxlength="30" placeholder="username">&nbsp;<input id="userColor" style="padding: 0.5vh; border-radius: 0.5rem; border: none;" class="color-input" type="color" value="#000000"><li style="font-size: 18px;">press enter to submit</li>');
      adduser();
    }
      }
  function adduser() {
      // submit user to server
      document.getElementById('username-span').innerHTML = document.getElementById('nickname-input').value;
      $('#nickname-input').prop('disabled', true);
      username = username.trim().replace(/\s\s+/g, ' ');
      socket.emit('adduser', username, admin, vcid, 
      function nameTaken(taken) {
        if (taken) {
          // if requested username was already taken
          if (noname) {
            id = Math.floor(Math.random() * (999 - 100 + 1) + 100);
            username = 'USER ' + id;
            adduser();
          } else {
            $('#nickname-input').prop('disabled', false);
            Swal.fire(
              'This name isn\'t allowed.',
              '"' + username + '" is already being used. Please choose another username.',
              'error'
            );
            playId('e');
          //$('#nickname-input').val('');
          // $('#userAcc').val(username);
          // closeFirstMenu();
          }
        } else {
          $('#nickname-input').val('');
          $('#userAcc').val(username);
          closeFirstMenu();
        }
      });
    }
  $('#nickname-input').keypress(function(e) {
    $('#menuAcc').html('<input id="userAcc" maxlength="30" onkeypress="return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 48 && event.charCode <= 57)" placeholder="username" style="width: 200px;">&nbsp;<input id="userColor" style="padding: 0.5vh; border-radius: 0.5rem; border: none;" class="color-input" type="color" value="#000000"><li style="font-size: 18px;">press enter to submit</li>');
    let keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
      let userinput = $('#nickname-input').val();
      if (userinput) {
        // admin
        if (userinput.charAt(0) == '!') {
          for (let i = 0; i < admins.length; i++) {
            // https://jsfiddle.net/h5mr3gua/4/
            var adm = admins[i];
            var encoded = CryptoJS.AES.encrypt(userinput, "replit");
            var decrypted = CryptoJS.AES.decrypt(encoded, "replit");
            if (decrypted == adm.password) {
              username = adm.name;
              adminColor = adm.color;
              var admCol;
              globalThis.admCol = adminColor;
              adminUser();
            }
          }
        } else if (userinput.length > 30) {
          // no hackers.
          Swal.fire(
            'Nice try.',
            'You aren\'t special.',
            'error'
          );
          playId('e')
          username = 'I\'m a Person Who Tried To Hack Lel || Kick Me Please';

          adduser();
        } else if (userinput.toLowerCase().includes("server") || admins.includes(userinput.toLowerCase()) || userinput.toLowerCase().includes("halfcookedramen")) {
          // honka honka
          username = '🤡';

          adduser();
        } else {
        if (userinput.includes("_") == true){
              e.preventDefault();
              Toast.fire({
              icon: 'error',
              title: 'Underscores aren\'t allowed'
    }); /*Change it to modal*/
        }
        else if (userinput.includes(" ") == true){
              e.preventDefault();
              Toast.fire({
              icon: 'error',
              title: 'Spaces aren\'t allowed'
    }); /*Change it to modal*/
        }
        else{
          username = userinput;
          admin = 0;

          adduser();
        }
        }
        noname = 0;
      } else {
        id = Math.floor(Math.random() * (999 - 100 + 1) + 100);
        username = 'USER' + id;
        admin = 0;
        adduser();
        noname = 1;
      }
    }
    function adduser() {
      // submit user to server
      
      document.getElementById('username-span').innerHTML = document.getElementById('nickname-input').value;
      $('#nickname-input').prop('disabled', true);
      username = username.trim().replace(/\s\s+/g, ' ');
      socket.emit('adduser', username, admin, vcid, 
      function nameTaken(taken) {
        if (taken) {
          // if requested username was already taken
          if (noname) {
            id = Math.floor(Math.random() * (999 - 100 + 1) + 100);
            username = 'USER ' + id;
            adduser();
          } else {
            $('#nickname-input').prop('disabled', false);
            Swal.fire(
              'This name isn\'t allowed.',
              '"' + username + '" is already being used. Please choose another username.',
              'error'
            );
            playId('e');
          }
        } else {
          $('#nickname-input').val('');
          $('#userAcc').val(username);
          closeFirstMenu();
        }
      });
    }
    function adminUser() {
      // admin stuff
      admin = 1;
      $("#m").attr('maxlength', '500');
      $('#menuAcc').html('<input id="tagAcc" maxlength="20" placeholder="tag"><input id="userAcc" onkeypress="return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 48 && event.charCode <= 57)" maxlength="30" placeholder="username">&nbsp;<input id="userColor" style="padding: 0.5vh; border-radius: 0.5rem; border: none;" class="color-input" type="color" value="#000000"><li style="font-size: 18px;">press enter to submit</li>');
      adduser();
          document.getElementById('rememberforadmins').style.visibility = "visible";
    }
  });
  // declare variables related to chat messages and commands
  var submissions = 0;
  var spamTimer = 2; /*This is between each message. Not when there is an excess of messages */

  var input;

  var whitelisted = 0;

  var playing = 0;

  var words;
  var command;
  var target;

  var tag = "";
  var hasTag = 0;

  var typing = false;
  var timeout;
  var usersTyping = [];
  var messageList = document.getElementById('messages');

  var tbScreen = "rooms";

  var isPm = 0;
  var pmUser = '';

  // message function to display messages
  function message(msg, color) {
    var name = msg.split(' : ')[0];
    var nameNoTag = name.includes("] ") ? name.split("] ")[1] : name;
    var sendCol;
    var msgSender;
    var theme = localStorage.getItem('theme');
    if (theme == "default"){
    sendCol = "2F4F4F";
    if (name.includes(username)){
      msgSender = "client";
    }
    else{
      msgSender = "network";
    }
    }
    else if (theme == "dark"){
    sendCol = "FFFFFF";
    if (name.includes(username)){
      msgSender = "dark-client";
    }
    else{
      msgSender = "dark-network";
    }
    }
    else if (theme == "sunset"){
    sendCol = "000";
    if (name.includes(username)){
      msgSender = "sunset-client";
    }
    else{
      msgSender = "sunset-network";
    }
    }
    else if (theme == "custom"){
    sendCol = "000";
    if (name.includes(username)){
      msgSender = "client";
    }
    else{
      msgSender = "network";
    }
    }
    msg = msg.substr(name.length);
    var scrollDown = messageList.scrollHeight - messageList.scrollTop <= messageList.clientHeight + 50;
    var biggerMargin = $("#messages :last-child")[$("#messages :last-child").length-2] ? $("#messages :last-child")[$("#messages :last-child").length-2].className !== +msgSender + "Msg" : false;
    $('#messages').append($('<li id="messagesNormal" class="' + msgSender + 'Msg" style="margin: ' + (biggerMargin ? 30 : 10) + 'px ' + (msgSender == "client" ? 100 : 0) + 'px 10px ' + (msgSender == "network" ? 100 : 0) + 'px;">').html('<a style="color:' + color + ';">' + name + '</a><a style="color:#'+sendCol+';">' + msg + '</a>'));
    if (scrollDown) messageList.scrollTo(0, messageList.scrollHeight);
  }
  // display info chats
  function smallMessage(msg) {
    if (messageList.scrollHeight - messageList.scrollTop <= messageList.clientHeight + 50) {
      $('#messages').append($('<li id="messagesSmall">').html('<a style="color:#ce2029;">' + msg + '</a>'));
      messageList.scrollTo(0, messageList.scrollHeight);
    } else {
      $('#messages').append($('<li id="messagesSmall">').html('<a style="color:#ce2029;">' + msg + '</a>'));
    }
  }

  function joinRoom(room) {
    // join a room

    if (room.includes('admin')){
      if(admin){
        $("#messages").empty();
        socket.emit('switchRoom', room);
        $('#feedback').html(" ");
      }
      else{
        Toast.fire({
          icon: 'error',
          title: "You aren't allowed in this room."
        });
      }
    }
    else{
    $("#messages").empty();
    socket.emit('switchRoom', room);
    $('#feedback').html(" ");
    }
  }

  // stuff related to taskbar opening/closing
  $('body').on('click', function(e) {
    if (!$(e.target).closest('.taskbar').length) {
      $('taskbar').animate({ left: '-20%' }, 'fast');
      $('#taskbarEffect').fadeOut('fast');
    } else {
      $('taskbar').animate({ left: '0' }, 'fast');
      $('#taskbarEffect').fadeIn('fast');
    }
  });

  function changeTbButton(id) {
    if (tbScreen != id) {
      var currentId = tbScreen;
      $('#' + currentId + 'Button').css('background', '#e0ad9d').css("cursor", "pointer");
      $('#' + id + 'Button').css('background', '#45ADA8').css("cursor", "default");
      $('.tb' + currentId).animate({ left: '-100%' }, 'fast', function() {
        $('.tb' + currentId).css("left", '100%');
      });
      $('.tb' + id).animate({ left: '0' }, 'fast');
      tbScreen = id;
    }
  }

  $('#infoButton').on('click', function() {
    changeTbButton('info');
  });
  $('#usersButton').on('click', function() {
    changeTbButton('users');
    socket.emit('reqUserlist', 'taskbar');
  });

  socket.on('userlist', function(userlist) {
    var users = '';
    var extcmds = [];
    for (let i = 0; i < userlist.length; i++) {
      let userStr = userlist[i].toString();
      users += '<div id="' + userStr + '" class="users">' + userStr + '<a class="material-icons" style="font-size:24px;right:0;position:absolute;width:50px">arrow_drop_down</a></div><div id="' + userStr + 'act" class="userAction"><div id="' + userStr + ';vc" class="userActions">Call</div><div id="' + userStr + ';pm" class="userActions">Message</div><div id="' + userStr + ';mention" class="userActions">Mention</div></div><d></d>';
      if (admin && !Object.values(admins).forEach(adm => adm.name.includes(userStr))) {
        extcmds.push(userStr);
      }
    }
    $('#userslist').html(users);

    $("#" + username.replace(' ', '\\ ')).html('<div id="' + username + '" class="users" style="cursor:default;background:#6fc5a1;">' + username + '</div>')

    for (let i = 0; i < extcmds.length; i++) {
      let userStr = extcmds[i];
      $('#' + userStr.replace(' ', '\\ ') + 'act').html('<div id="' + userStr + ';vc" class="userActions">Call</div><div id="' + userStr + ';pm" class="userActions">Message</div><div id="' + userStr + ';mention" class="userActions">Mention</div><div id="' + userStr + ';whitelist" class="userActions" style="background: #547980;">Whitelist</div><div id="' + userStr + ';reqKick" class="userActions" style="background: #547980;">Kick</div><div id="' + userStr + ';reqMute" class="userActions" style="background: #547980; width: 32.5%;float: left;margin-right:5%;">Mute</div><div id="' + userStr + ';reqUnmute" class="userActions" style="background: #547980; width: 32.5%;float: left;">Unmute</div><div id="' + userStr + ';reqBan" class="userActions" style="background: #547980;width: 32.5%;float: left;margin-right:5%;">Ban</div><div id="' + userStr + ';reqUnban" class="userActions" style="background: #547980;width: 32.5%;float: left;">Unban</div>');
    }

    $('.users').on('click', function() {
      var user = this.id.replace(' ', '\\ ');
      var dir = ($('#' + user + 'act').is(':visible') ? 'down' : 'up');
      $('#' + user + ' a').html('arrow_drop_' + dir);
      $('#' + user + 'act').stop().slideToggle('fast');
    });

    // user actions button thingies 
    $('.userActions').on('click', function() {
      let user = this.id.split(';')[0]; 
      let cmd = this.id.split(';')[1];
      if (cmd == 'pm') {
        isPm = 1;
        pmUser = user;
        $('#pm').css('display', 'block').html('You are currently private messaging ' + pmUser + '<span class="material-icons">cancel</span>');
        $('#pm span').on('click', function() {
          isPm = 0; 
          $('#pm').css('display', 'none');
        });
      } 
      if (cmd == 'mention') {
        mentionUser = user;
        document.getElementById("m").value = document.getElementById("m").value+"@"+mentionUser+' ';
        document.getElementById("m").focus();
      } else {
        socket.emit(cmd, user);
      }
    });
  });

  $('.rooms').on('click', function() {
    if (!$(this).text().includes('>')) {
      joinRoom(this.id);
      rooms = document.querySelectorAll('.rooms');
      rooms.forEach((room) => {
        $(room).text ($(room).text().replace('> ','').replace(' <',''));
        $(room).css('cursor','pointer');
      });
      $(this).text(`> ${$(this).text()} <`).css('cursor','default');
    }
  });
  $('#roomForm').submit(function() {
    var roomInput = $("#entroom");
    joinRoom(roomInput.val());
    $("#main").text ($("#main").text().replace('> ','').replace(' <',''));
    $("#secondary").text ($("#secondary").text().replace('> ','').replace(' <',''));
    roomInput.val("");
    return false;
  });

  /*

    This message will probably never be seen, but..
    Why the heck are you looking through this awful code??
    Do you find enjoyment out of this????
    Go do something actually productive, nerd! >:(

  */


  $('#roomsButton').on('click', function() {
    changeTbButton('rooms');
  });
  // submit message
  $('#msgForm').submit(function() {
    input = $('#m').val();
    if (input.length > 250 && !admin) {
      input = 'im a stupid hacker xDxD Poggers i like furries and i play fortnite for 16 hours a day'; // no haker!!!!
    }
    if (submissions > 0 && !(admin || whitelisted)) {
      // no spamming
      if (input) {
        Toast.fire({
          icon: 'error',
          title: 'Please wait ' + spamTimer + ' seconds.',
          timer: 2000
        });

      }
    }
    else if (input.charAt(0) == "/") {
      // commands and stuff
      if (banned) {
        Toast.fire({
          icon: 'error',
          title: 'You are not allowed to do this'
        });
      } else {
        words = input.split(' ');
        command = words[0].toLowerCase();
        target = words[1];

        if (command == '/cmds') {
          Swal.fire({
            title: 'Commands',
            html: `<a style="text-align:left;"><h3>normal commands</h3><li>/username</li><li>/userlist</li><li>/pm [someone's username] [a message]</li><li>/room [a room number]</li><li>/vc [someone's username]</li><li>/elevator</li><br><h3>admin commands</h3><li>/clear</li><li>/mute [someone's username]</li><li>/unmute [someone's username]</li><li>/kick [someone's username]</li><li>/whitelist [someone's username]</li><li>/announce [a message]</li><li>/ban [someone's username]</li><li>/unban [someone's username]</li><br><h3>whitelist commands</h3><li>/tag [a word]</li><li>/warn [username] [reason]</li><li>/createadmin [name] [color] [password]</li><br></a>`,
            icon: 'info'
          })
        }
        else if (command == '/clear') {
          if (admin) {
            socket.emit('reqClear');
          } else {
            Toast.fire({
              icon: 'error',
              title: 'You are not an admin!'
            });
          }
        }
        else if (command == '/username') {
          socket.emit('du');
          openFirstMenu();
          $('#nickname-input').prop('disabled', false);
          tag = '';
        }
        else if (command == '/userlist') {
          socket.emit('reqUserlist');
        }
        else if (command == '/mute') {
          if (admin) {
            if (target) {
              if (Object.values(admins).forEach(adm => adm.name.includes(target))) {
                Toast.fire({
                  icon: 'error',
                  title: 'Nice try.'
                });
              } else {
                socket.emit('reqMute', target);
              }
            } else {
              smallMessage('Invalid syntax. Correct usage: /mute [username]');
            }
          } else {
            Toast.fire({
              icon: 'error',
              title: 'You are not an admin!'
            });
          }
        }
        else if (command == '/unmute') {
          if (admin) {
            if (target) {
              if (Object.values(admins).forEach(adm => adm.name.includes(target))) {
                Toast.fire({
                  icon: 'error',
                  title: 'Nice try.'
                });
              } else {
                socket.emit('reqUnmute', target);
              }
            } else {
              smallMessage('Invalid syntax. Correct usage: /unmute [username]');
            }
          } else {
            Toast.fire({
              icon: 'error',
              title: 'You are not an admin!'
            });
          }
        }

        else if (command == '/pm') {
          if (target && words[2]) {
            socket.emit('pm', target, words.splice(2).join(' '));
          } else {
            smallMessage('Invalid syntax. Correct usage: /pm [username] [message]');
          }
        }
        else if (command == '/room') {
          if (target) {
            if (admin || whitelisted) {
              joinRoom(target);
            } else if (/^[0-9]$/.test(target)) {
              joinRoom(target);
            } else {
              Toast.fire({
                icon: 'error',
                title: "Using this command, you can only join number rooms. Use the option in the rooms field instead."
              });
            }
          } else {
            smallMessage('Invalid syntax. Correct usage: /room [number]');
          }
        }
        else if (command == '/whitelist') {
          if (admin) {
            if (target) {
              socket.emit('whitelist', target);
            } else {
              smallMessage('Invalid syntax. Correct usage: /whitelist [username]');
            }
          } else {
            Toast.fire({
              icon: 'error',
              title: 'You are not an admin!'
            });
          }
        }
        else if (command == '/elevator') {
          if (playing) {
            document.getElementById('m1').pause();
            playing = 0;
          } else {
            playId('m1');
            playing = 1;
          }
        }
/*        else if (command == '/game') {
            document.getElementById('game').style.display="block";
}*/
        else if (command == '/tag') {
          if (admin || whitelisted) {
            if (target && !hasTag) {
              tag = '[' + target + '] ';
              hasTag = 1;
            } else if (target && hasTag) {
              tag = '[' + target + '] ';
            } else if (hasTag) {
              tag = '';
              hasTag = 0;
            } else {
              smallMessage('Invalid syntax. Correct usage: /tag [word]');
            }
          } else {
            Toast.fire({
              icon: 'error',
              title: 'You are not an admin!'
            });
          }
        }
        else if (command == '/announce') {
          if (admin || whitelisted) {
            if (target) {
              socket.emit('announce', words.splice(1).join(' '));
            } else {
              smallMessage('Invalid syntax. Correct usage: /announce [message]');
            }
          } else {
            Toast.fire({
              icon: 'error',
              title: 'You are not an admin!'
            });
          }
        }
        else if (command == '/kick') {
          if (admin) {
            if (target) {
              if (Object.values(admins).forEach(adm => adm.name.includes(target))) {
                Toast.fire({
                  icon: 'error',
                  title: 'Nice try.'
                });
              } else {
                socket.emit('reqKick', target);
              }
            } else {
              smallMessage('Invalid syntax. Correct usage: /kick [user]');
            }
          } else {
            Toast.fire({
              icon: 'error',
              title: 'You are not an admin!'
            });
          }
        }
        else if (command == '/ban') {
          if (admin) {
            if (target) {
              if (Object.values(admins).forEach(adm => adm.name.includes(target))) {
                Toast.fire({
                  icon: 'error',
                  title: 'Nice try.'
                });
              } else {
                socket.emit('reqBan', target);
              }
            } else {
              smallMessage('Invalid syntax. Correct usage: /ban [user]');
            }
          } else {
            Toast.fire({
              icon: 'error',
              title: 'You are not an admin!'
            });
          }
        }
        else if (command == '/unban') {
          if (admin) {
            if (target) {
              if (Object.values(admins).forEach(adm => adm.name.includes(target))) {
                Toast.fire({
                  icon: 'error',
                  title: 'Nice try.'
                });
              } else {
                socket.emit('reqUnban', target);
              }
            } else {
              smallMessage('Invalid syntax. Correct usage: /unban [user]');
            }
          } else {
            Toast.fire({
              icon: 'error',
              title: 'You are not an admin!'
            });
          }
        }
        else if (command == '/vc') {
          if (target) {
            socket.emit('vc', target);
          } else {
            smallMessage('Invalid syntax. Correct usage: /vc [username]');
          }
        }
        else if (command == '/warn') {
          if (admin || whitelisted) {
            if (target) {
              if (Object.values(admins).forEach(adm => adm.name.includes(target))) {
                Toast.fire({
                  icon: 'error',
                  title: 'Nice try.'
                });
              } else {
                socket.emit('reqWarn', target, words.splice(2).join(' '));
              }
            } else {
              smallMessage('Invalid syntax. Correct usage: /warn [user] [reason]');
            }
          } else {
            Toast.fire({
              icon: 'error',
              title: 'You are not an admin!'
            });
          }
        }
        else if (command == '/update') {
          if (admin) {
            socket.emit('reqUpdate');
          } else {
            Toast.fire({
              icon: 'error',
              title: 'You are not an admin!'
            });
          }
        }
        else if (command == '/forcereload') {
          if (admin) {
            socket.emit('reqReload');
          } else {
            Toast.fire({
              icon: 'error',
              title: 'You are not an admin!'
            });
          }
        }
        else if (command == '/createadmin') {(async function() {
          if (!words[3]) {
            smallMessage('Invalid syntax. Correct usage: /createadmin [name] [color] [password]');
            return;
          }
          if (!await fetch("/admins.json").then(data => data.json()).then(res => res.allowAdminCreation)) {
            Swal.fire({
              icon: 'error',
              title: "That isn't allowed!",
              html: "You don't have permission to create an admin.<br><br>If you are the owner of the site, read the README file."
            });
            return;
          }
          const adminData = {
            name: target,
            color: words[2],
            password: `!${words[3]}`.hashCode()
          }
          socket.emit("create admin", adminData, function() {
            Swal.fire({
              icon: 'success',
              title: 'Succesfully created admin object',
              html: "<i>Refresh the page to use the new admin data.</i> To login as an admin, enter your username as '!password', with 'password' being your requested password." + (words[3].length > 9 ? "<br><br>Note: since your password can't fit in the default 20 character username input box, you will need to increase the max length. Or just choose a new password." : "")
            });
          });
        })()}
        else {
          smallMessage('Invalid command. Type "/cmds" for a list of commands!');
        }
      }
    } else {
      if (input) {
        if (isPm){ 
          socket.emit('pm', pmUser, input);
        }
        
        else {
          if (admin){
            if(document.getElementById('userColor').value == "#000000"){
              adminColor = localStorage.getItem('userCol');
              document.getElementById('userColor').value = localStorage.getItem('userCol');
            }
            else{
            adminColor = document.getElementById('userColor').value;
              localStorage.removeItem('userCol'); localStorage.setItem('userCol',document.getElementById('userColor').value)
            }
                        const d2 = new Date();

                        var date2 = d2.getHours()+':'+d2.getMinutes()+':'+d2.getSeconds()+' ';

          socket.emit('admin message', `<span class="date">`+date2+`</span>`+tag + username + ' : ' + input, adminColor);
          }
          else{ 
            /*Banned User Colors don't work because the element does not exist (document.getElementById('userColor').value)
Later fixed by adding a replacement
*/
            var colors = document.getElementById('userColor');
            if (!document.getElementById('userColor')){
              colors = "#000000";
            }
            else{
              colors = document.getElementById('userColor').value;
            }
            const d = new Date();
            var date = d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+' ';

            socket.emit('chat message',`<span class="date">`+date+`</span><a style="color: `+colors+`">`+ tag + username +'</a>'+' : ' + input)
          }
        }
      }
    }
    // prevent spam thingies
    submissions += 1;
    setTimeout(function() {
      submissions -= 1;
      document.getElementById("m").disabled = false;
    }, spamTimer * 1000);
    $('#m').val('');
    // ur not typing if a message has been sent
    notTyping();
    return false;
  });
  socket.on('switchRoom', function(){
    alert('hi');
  })
  socket.on('chat message', function(msg, color, img) {
    // display message from server
    if (img) {
      msg = msg.replace('<img>', `<a target="_blank" href="data:image/png;base64,`+Base64String.decompress(img)+`"><img class="chat-img" src="data:image/png;base64,` + Base64String.decompress(img) + '" alt="image"></a>')
    }
    if (msg.includes("imggif")) {
      msg = msg.replace('<imggif>', `<a target="_blank" href="`+img+`"><img class="chat-img" src="`+img+`" alt="gif"></a>`);
      sessionStorage.clear();
    }
    /**/
    message(msg, color);
  });
  socket.on('sendClear', function() {
    // clear array of messages
    $("#messages").empty();
    smallMessage('The chat was cleared.');
  });
  socket.on('mute', function(idk) {
    // muting function
    if (!admin) {
      user = (idk) ? idk : '{SERVER}';
      Swal.fire(
        'You got muted.',
        'You were muted by ' + user,
        'error'
      );
      playId('e');
      document.getElementById("m").disabled = true;
      document.getElementById("m").placeholder = 'You are muted.';
    }
  });
  socket.on('unmute', function(idk) {
    // unmute function
    Swal.fire(
      'You got unmuted.',
      'You were unmuted by ' + idk,
      'success'
    );
    playId('n2');
    document.getElementById("m").disabled = false;
    document.getElementById("m").placeholder = 'type your message here';
  });
  socket.on('kick', function(idk) {
    // muting function
    if (!admin) {
      user = (idk) ? idk : '{SYSTEM}';
      Swal.fire(
        'You got kicked.',
        'You were kicked by ' + user,
        'error'
      );
      playId('e');
      location.reload();
    }
  });
  socket.on('ban', function(idk) {
    // ban function
    if (!admin) {
      document.cookie = "banned=1; expires=Tue, 19 Jan 2038 03:14:07 UTC";
      socket.emit('du');
      Swal.fire(
        'You got banned.',
        'You were banned by ' + idk,
        'error'
      ).then(() => {
        location.reload();
      });
      playId('e');
    }
  });
  socket.on('unban', function(idk) {
    // unban function
    if (!admin) {
      document.cookie = "banned=0";
      Swal.fire(
        'You got unbanned.',
        'You were unbanned by ' + idk,
        'success'
      ).then(() => {
        location.reload();
      });
      playId('n2');
    }
  });
  socket.on('pMsg', function(sender, msg) {
    // display private message
    message('{PRIVATE MESSAGE} ' + sender + ' : ' + msg, '#49796b');
    playId('n1');
  });
  socket.once('whitelisted', function(user) {
    // get whitelisted
    whitelisted = 1;
    Swal.fire(
      'You are whitelisted.',
      'You were whitelisted by ' + user + '. Enjoy the few perks of being a whitelisted member!',
      'success'
    );
    playId('n2');
  });
  socket.on('warn', function(warner, reason) {
    // get warned
    if (!admin) {
      reason = (reason) ? reason : 'none.';
      Swal.fire({
        title: 'You got a warning!',
        html: 'You were warned by ' + warner + '.<br><br>Reason: ' + reason,
        icon: 'error'
      });
      playId('e');
    }
  });
  socket.on('sendUpdate', function() {
    // update user by refreshing their page
    Swal.fire({
      title: 'The website has recieved an update!',
      text: 'Refresh your page?',
      icon: 'info',
      showCancelButton: true,
      cancelButtonText: `I\'m dumb`,
      confirmButtonText: `Yes`,
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
    playId('n3');
  });
  socket.on('sendReload', function() {
    // reload user by refreshing their page
    Swal.fire({
      title: 'You\'re being forced to reload this page!',
      icon: 'info',
      showCancelButton: false,
      confirmButtonText: `Refresh`,
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
    playId('n3');
  });
  // the following is a jumble of inefficient and messy code related to voicechat.
  socket.on('vc', function(vc, user) {
    // this gets activated if you request voicechat
    navigator.mediaDevices.getUserMedia({ video: false, audio: true })
      .then(function(mylocalStream) {
        myStream = mylocalStream;
        call = peer.call(vc, myStream, { metadata: { caller: username } });
        call.on('stream', function(stream) {
          var audio = document.createElement('audio');
          audio.srcObject = stream;
          audio.onloadedmetadata = function() {
            Toast.fire({
              icon: 'success',
              title: user + ' accepted the call.'
            });
            $("#vcMenu").show();
            audio.play();
          }
        });
        call.on('close', function() {
          $('#vcMenu').hide();
          Toast.fire({
            icon: 'error',
            title: 'You have disconnected from ' + user + '.'
          });
          var s = function(t) {
            t.stop();
          }
          myStream.getAudioTracks().map(s);
          socket.removeListener('hungup');
          socket.emit('hangup', user);
        });
        socket.on('hungup', function() {
          $('#vcMenu').hide();
          Toast.fire({
            icon: 'error',
            title: user + ' disconnected from the call.'
          });
          var s = function(t) {
            t.stop();
          }
          myStream.getAudioTracks().map(s);
        });
        socket.on('dec', function() {
          Toast.fire({
            icon: 'error',
            title: user + ' declined the call.'
          });
          var s = function(t) {
            t.stop();
          }
          myStream.getAudioTracks().map(s);
        });
      })
      .catch(function(err) {
        Toast.fire({
          icon: 'error',
          title: 'Call error. ' + err
        });
        socket.emit('hangup', user);
      })
  });
  peer.on('call', function(localcall) {
    // this gets activated if you get sent a voicechat request from someone else
    call = localcall;
    Swal.fire({
      title: 'You were sent a call from ' + call.metadata.caller + '!',
      text: 'Click OK to accept.',
      icon: 'info',
      showDenyButton: true,
      denyButtonText: `nah`,
      confirmButtonText: `Accept`,
    }).then((result) => {
      document.getElementById('r1').pause();
      document.getElementById('r1').currentTime = 0;
      if (result.isConfirmed) {
        navigator.mediaDevices.getUserMedia({ video: false, audio: true })
          .then(function(mylocalStream) {
            myStream = mylocalStream;
            call.answer(myStream);
            call.on('stream', function(stream) {
              var audio = document.createElement('audio');
              audio.srcObject = stream;
              audio.onloadedmetadata = function(e) {
                Toast.fire({
                  icon: 'success',
                  title: 'Connected to a call with ' + call.metadata.caller + '.'
                });
                $("#vcMenu").show();
                audio.play();
              }
            });
            call.on('close', function() {
              $('#vcMenu').hide();
              Toast.fire({
                icon: 'error',
                title: 'You have disconnected from ' + call.metadata.caller + '.'
              });
              var s = function(t) {
                t.stop();
              }
              myStream.getAudioTracks().map(s);
              socket.removeListener('hungup');
              socket.emit('hangup', call.metadata.caller);
            });
            socket.on('hungup', function() {
              $('#vcMenu').hide();
              Toast.fire({
                icon: 'error',
                title: call.metadata.caller + ' disconnected from the call.'
              });
              var s = function(t) {
                t.stop();
              }
              myStream.getAudioTracks().map(s);
            });
          })
          .catch(function(err) {
            Toast.fire({
              icon: 'error',
              title: 'Call error. ' + err
            });
            socket.emit('hangup', call.metadata.caller);
          })
      } else if (result.isDenied) {
        Toast.fire({
          icon: 'error',
          title: 'Declined call.'
        });
        socket.emit('dec', call.metadata.caller);
      }
    });
  });
  socket.on('serverChat', function(msg) {
    // display chat from the server
    smallMessage(msg);
  });

  socket.on('serverToast', function(msg) {
    // display toast notification from server
    Toast.fire({
      icon: 'info',
      title: '{SERVER} :',
      text: msg
    });
  })
  socket.on('announcement', function(sender, msg) {
    // display announcement
    message('{ANNOUNCEMENT} ' + sender + ' : ' + msg, '#49796b');
  });
  socket.on('playSound', function(soundid) {
    // play sound requested from server
    playId(soundid);
  });
  socket.io.on('reconnect', () => {
    // reconnect to server after error
    socket.emit('reconnect', username, admin, vcid);
  });
  // the following is related to displaying "user is typing" 
  $('#m').on("keypress", e => {
    let keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode != '13' && !isPm) {
      if (!typing) {
        typing = true;
        socket.emit('typing');
        timeout = setTimeout(notTyping, 5000);
      } else {
        clearTimeout(timeout);
        timeout = setTimeout(notTyping, 5000);
      }
    }
  });
  function notTyping() {
    typing = false;
    socket.emit('notTyping');
  }
  function resetTypeList() {
    if (usersTyping.length == 0)
      $('#feedback').html(" ");
    else if (usersTyping.length < 4)
      $('#feedback').html("<p><i>" + usersTyping.toString().split(',').join(', ') + " is typing..." + "</i></p>");
    else if (usersTyping.length >= 4) 
      $('#feedback').html("<p><i>" + "Several users are typing..." + "</i></p>");
  }
  socket.on('typing', function(user) {
    usersTyping.push(user);
    resetTypeList();
  });
  socket.on('notTyping', function(user) {
    usersTyping.splice(usersTyping.indexOf(user), 1);
    resetTypeList();
  });

  // get a notification when you get mentioned.
  socket.on('mention', function(user) {
    Toast.fire({
      icon: 'info',
      title: 'You were mentioned by ' + user
    });
    pingcount = pingcount+1;
    // document.title = "("+pingcount+") Node JS Chatroom";
    playId("me1");
  });

  // after all the code is loaded, open thing
  $('.modal-content').animate({ top: '-100px' }, 1500);
  setTimeout(function() {
    $('#logo').animate({ top: '25px' }, 1500);
  }, 500);
  
  // vue components
  Vue.component('notice', {
    data: () => ({ 
      rules: showRules,
      faq: showFaq,
      cred: showInfo
    }),
    template: `<div class="notice">
      <a v-on:click="rules()">rules</a> <b>¦</b> 
      <a v-on:click="faq()">faq</a> <b>¦</b> 
      <a v-on:click="cred()">credit</a>
    </div>`
  });
  // create vue objects for each component. add vue class to vue component elements
  let vueElem = $(".vue");
  for (let i = 0; i < vueElem.length; i++) {
    new Vue ({ el: vueElem[i] });
  }

  // vue data
  const vueData = [
    {
      data: {
        version: version
      },
      el: "ver"
    }
  ];

  for (let i = 0; i < vueData.length; i++) {
    var data = vueData[i];
    new Vue ({
      data: data.data,
      el: $(data.el)[0]
    })
  }

});