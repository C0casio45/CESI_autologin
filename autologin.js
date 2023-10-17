// ==UserScript==
// @name         ViaCesiAutoLogger
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       C0casio45
// @match        https://moodle.cesi.fr/login/index.php
// @match        https://wayf.cesi.fr/*
// @match        https://sts.viacesi.fr/adfs/ls/*
// @match        https://ent.cesi.fr/servlet/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const email_address = "";
    const pwd = "";
    const urlParams = new URLSearchParams(window.location.search);

    const login_root=[
        "https://moodle.cesi.fr/login/index.php?authCAS=CAS",
        "https://wayf.cesi.fr/login?service=https%3A%2F%2Fmoodle.cesi.fr%2Flogin%2Findex.php%3FauthCAS%3DCAS",
        "https://wayf.cesi.fr/login?client_name=ClientIdpViaCesiFr&needs_client_redirection=true&UserName=" + encodeURIComponent(email_address)
    ];

    const cesi_path = {
        "moodle_root" : "https://moodle.cesi.fr/",
        "moodle" : "https://moodle.cesi.fr/course/view.php?id=3316",
        "ent" : "https://ent.cesi.fr/accueil-apprenant"
    };

    console.log(window.location.host);

    switch(window.location.host){
        case "moodle.cesi.fr":
            if(urlParams.has('cocabot')){
                document.location.href = cesi_path.moodle;
            }
            document.location.href = login_root[2];
            break;

        case "ent.cesi.fr":
            document.location.href = cesi_path.moodle;
            break;


        case "sts.viacesi.fr":
            document.getElementById("passwordInput").value = pwd;
            Login.submitLoginRequest();
            break;

        case "wayf.cesi.fr":
            //add check for button on js error auto redirect

            onload = (event) => {
                if(document.getElementsByClassName("success").length > 0){
                    document.body.innerHTML = dialog;
                } else {
                    addInput();
                }
            }
            break;

        default:
            break;
    }

    const dialog = `
        <dialog open>
            <h1>Select desired cesi website</h1>
            <a href="${login_root[0]}">Moodle</a>
            <a href="${cesi_path.ent}">ENT</a>
        </dialog>
        `;
    function addInput(){
        let input = document.createElement("input");
        input.type = "submit";
        input.setAttribute('id','exec');
        const form = document.getElementsByTagName("form")[0];
        form.appendChild(input);
        input.click();
    }

})();