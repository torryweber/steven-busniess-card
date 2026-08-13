/* =========================================
   GST HARDWARE
   STEVEN DIGITAL BUSINESS CARD
   ========================================= */


/* -----------------------------------------
   NFC / CARD URL
   ----------------------------------------- */

const CARD_URL =
    "https://torryweber.github.io/steven-busniess-card/";


/* -----------------------------------------
   CONTACT INFORMATION
   ----------------------------------------- */

const contact = {

    name:
        "Steven - GST Hardware",

    company:
        "GST Hardware Sdn Bhd",

    phone:
        "+60122601271",

    email:
        "sales@gsthardware.com.my",

    website:
        "https://www.gsthardware.com.my/"

};


/* -----------------------------------------
   TOAST
   ----------------------------------------- */

const toast =
    document.getElementById("toast");


function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    clearTimeout(
        window.__toast
    );

    window.__toast =
        setTimeout(

            () => {

                toast.classList.remove(
                    "show"
                );

            },

            2200

        );

}


/* -----------------------------------------
   SAVE CONTACT
   ----------------------------------------- */

document
    .getElementById("saveContact")
    .addEventListener(

        "click",

        () => {

            const vcf = [

                "BEGIN:VCARD",

                "VERSION:3.0",

                `N:${contact.name};;;;`,

                `FN:${contact.name}`,

                `ORG:${contact.company}`,

                `TEL;TYPE=CELL,VOICE:${contact.phone}`,

                `EMAIL;TYPE=WORK:${contact.email}`,

                `URL:${contact.website}`,

                "END:VCARD"

            ].join(
                "\r\n"
            );


            const blob =
                new Blob(

                    [vcf],

                    {
                        type:
                            "text/vcard;charset=utf-8"
                    }

                );


            const url =
                URL.createObjectURL(
                    blob
                );


            const a =
                document.createElement(
                    "a"
                );


            a.href =
                url;


            a.download =
                "Steven-GST-Hardware.vcf";


            document
                .body
                .appendChild(a);


            a.click();


            a.remove();


            URL.revokeObjectURL(
                url
            );


            showToast(
                "Contact file ready"
            );

        }

    );


/* -----------------------------------------
   SHARE CARD
   ----------------------------------------- */

document
    .getElementById("shareBtn")
    .addEventListener(

        "click",

        async () => {

            const shareData = {

                title:
                    "Steven | GST Hardware",

                text:
                    "Steven — GST Hardware Sdn Bhd",

                url:
                    CARD_URL

            };


            try {

                /*
                 * Native phone share
                 */

                if (
                    navigator.share
                ) {

                    await navigator.share(
                        shareData
                    );

                }


                /*
                 * Fallback
                 * Copy NFC URL
                 */

                else {

                    await navigator
                        .clipboard
                        .writeText(
                            CARD_URL
                        );


                    showToast(
                        "Card link copied"
                    );

                }

            }

            catch (error) {

                /*
                 * User cancelled
                 * share window.
                 */

            }

        }

    );


/* -----------------------------------------
   SERVICE WORKER
   ----------------------------------------- */

if (
    "serviceWorker"
    in navigator
) {

    window.addEventListener(

        "load",

        () => {

            navigator
                .serviceWorker
                .register(
                    "sw.js"
                )
                .catch(

                    () => {}

                );

        }

    );

}