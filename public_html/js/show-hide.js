function hideElement(div_name) {
    if (document.getElementById(div_name).style.display == 'none') {
        document.getElementById(div_name).style.display = 'block';
    } else document.getElementById(div_name).style.display = 'none';
}