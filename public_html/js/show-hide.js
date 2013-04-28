function hideElement(div_name) {
    if (document.getElementById(div_name).style.display == 'block') {
        document.getElementById(div_name).style.display = 'none';
    } else document.getElementById(div_name).style.display = 'block';
}