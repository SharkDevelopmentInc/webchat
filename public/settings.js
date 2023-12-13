document.getElementById('rememberforadmins').style.visibility = "hidden";      
document.getElementById('col1').style.visibility = "hidden";
    document.getElementById('col2').style.visibility = "hidden";

  function updateh1family() {
        var selector = document.getElementById('selecth1FontFamily');
        var family = selector.options[selector.selectedIndex].value;
        var h1 = document.getElementById('messagesNormal');
        h1.style.fontFamily = family;        
      }
  if(!localStorage.getItem('theme')){
    var defaultTheme = "default";
    localStorage.setItem('theme', defaultTheme);
  }
  var theme = localStorage.getItem('theme');
  if(theme == "default"){
    defaultTheme();
  }
  if(theme == "dark"){
    darkTheme();
  }
  if(theme == "sunset"){
    sunsetTheme();
  }
  document.getElementById('col1').value = localStorage.getItem('col1');
  document.getElementById('col2').value = localStorage.getItem('col2');

  if(theme == "custom"){
    customTheme();
  }
function defaultTheme(){
        document.getElementById('col1').style.visibility = "hidden";
    document.getElementById('col2').style.visibility = "hidden";

    document.getElementById("m").removeAttribute("class");
    document.getElementById("msgForm").removeAttribute("class");
    document.getElementById("b").removeAttribute("class");
    document.getElementById("m").classList.add("m");
    document.getElementById("b").classList.add("b");
    document.getElementById("msgForm").classList.add("msgForm");
    var themeDefault = "default";
  localStorage.removeItem('theme');
    localStorage.setItem('theme',themeDefault);
        document.body.style.backgroundImage = "linear-gradient(to top, #37ecba 0%, #72afd3 100%)";

  }
  function darkTheme(){
          document.getElementById('col1').style.visibility = "hidden";
    document.getElementById('col2').style.visibility = "hidden";

  document.getElementById("m").removeAttribute("class");
    document.getElementById("msgForm").removeAttribute("class");
    document.getElementById("b").removeAttribute("class");
    document.getElementById("m").classList.add("m-dark");
    document.getElementById("b").classList.add("b-dark");
    document.getElementById("msgForm").classList.add("msgForm-dark");
    var themeDark = "dark";
    localStorage.removeItem('theme');
    localStorage.setItem('theme',themeDark);
    document.body.style.backgroundImage = "linear-gradient(to top, #51515e 0%, #373741 100%)";
  }
  function sunsetTheme(){
          document.getElementById('col1').style.visibility = "hidden";
    document.getElementById('col2').style.visibility = "hidden";

      document.getElementById("m").removeAttribute("class");
    document.getElementById("msgForm").removeAttribute("class");
    document.getElementById("b").removeAttribute("class");
    document.getElementById("m").classList.add("m-sunset");
    document.getElementById("b").classList.add("b-sunset");
    document.getElementById("msgForm").classList.add("msgForm-sunset");
    var themeSunset = "sunset";
    localStorage.removeItem('theme');
    localStorage.setItem('theme',themeSunset);
    document.body.style.backgroundImage = "linear-gradient(to top, #e44cfe 0%, #feba4c 100%)";
  }
    function customTheme(){
          document.getElementById('col1').style.visibility = "visible";
    document.getElementById('col2').style.visibility = "visible";
     var col1 = document.getElementById('col1').value;
     var col2 = document.getElementById('col2').value; 
     localStorage.removeItem('col1');
      localStorage.removeItem('col2');
      localStorage.setItem('col1',col1);
    localStorage.setItem('col2',col2);
      document.getElementById("m").removeAttribute("class");
    document.getElementById("msgForm").removeAttribute("class");
    document.getElementById("b").removeAttribute("class");
    document.getElementById("m").classList.add("m");
    document.getElementById("b").classList.add("b");
    document.getElementById("msgForm").classList.add("msgForm");
    var themeCustom = "custom";
    localStorage.removeItem('theme');
    localStorage.setItem('theme',themeCustom);
      var customTheme = "linear-gradient(to top, "+col1+" 0%, "+col2+" 100%)";
    document.body.style.backgroundImage = customTheme;
  }
// REMEMBER ME
function remember(){
  var username = document.getElementById('username-span').innerHTML;
  localStorage.removeItem('remUser');
  localStorage.setItem('remUser', username);
}
function forget(){
  localStorage.removeItem('remUser');
}