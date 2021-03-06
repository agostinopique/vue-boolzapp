

dayjs.extend(window.dayjs_plugin_customParseFormat);
dayjs.extend(window.dayjs_plugin_relativeTime);


const app = new Vue({
    el: '#app',

    data: {
        myUser: {
            name: 'Agostino Pique',
            avatar: '_io'
        },

        users: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: '_5',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: '_6',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novit???',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: '_7',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che ?? il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: '_8',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho gi?? mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ],

        activeUser: 0,
        newMessage: '',
        searchUser: '',
        lastAccess: false,
        msgClicked: 0
    },

    methods: {

        // FUNZIONE PER IL CONTROLLO DEI SINGOLI DROPDOWN
        messageInfo(msgIndex){
            this.msgClicked = msgIndex;
            this.lastAccess = this.lastAccess ? false : true ; 
        },

        // FUNZIONE PER L'ELIMINAZIONE DEI MESSAGGI IN CHAT
        deleteMsg(msgIndex){
            this.users[this.activeUser].messages.splice(msgIndex, 1);
        },

        // FUNZIONE PER IL RECUPERO DELL'ULTIMO MESSAGGIO DI UNA CHAT
        getLastMessage(user){
            const {messages} = user;
            return (messages.length > 0) ? messages[messages.length - 1].message : 'Nessun messaggio';
        },

        // FUNZIONE PER IL RECUPERO DELL'ULTIMOA DATA DI UNA CHAT
        getLastDate(user){
            const {messages} = user;
            return (messages.length > 0) ? messages[messages.length - 1].date : '---'
        },

        // VISTO L'ULTIMA VOLTA
        lastSeen(){
            const utenteAttivo = this.users[this.activeUser];
            const mesUtenteAtt = utenteAttivo.messages;

            if(mesUtenteAtt.length > 0){
                const lastMsg = mesUtenteAtt[mesUtenteAtt.length - 1];
                return lastMsg.date
            } 

            return '---'
        },

        // FUNZIONE PER LA CREAZIONE DI UN NUOVO MESSAGGIO ALL'INVIO 
        newMessageData(){
            
            // TEMPLATE PER IL MESSAGGIO 
            const newMsg =  {
                date:   dayjs().format('DD/MM/YYYY HH:mm:ss'),
                message: this.newMessage,
                status: 'sent'
            }
            
            if(this.newMessage.length > 0){
                this.pushNewMessage(newMsg)
            }    

            // TIMING FUNCTION PER LA RISPOSTA DEL COMPUTER
            setTimeout(() => {
                const newReply =  {
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    message: 'I\'d like to book a table for Isaac Ocks',
                    status: 'received'
                };
    
                this.users[this.activeUser].messages.push(newReply);
            }, 2000);
            
        },

        // PUSH SOLO SE ?? PRESENTE ALMENO UN CARATTERE
        pushNewMessage(newMsg){
            
            this.newMessage = '';
            
            setTimeout(() => {
                this.users[this.activeUser].messages.push(newMsg);
            }, 500)
        },

        // FUNZIONE PER IL RECUPERO E FORMAT DELLA DATA E ORARIO DI UNA MESSAGGIO
        // VERSIONE SENZA DAYJS
        /* 
        messageDate(){
            
            const today = new Date();
            const day = today.getDate();
            const month = (today.getMonth()+1);
            const h = today.getHours();
            const m = today.getMinutes();
            const s = today.getSeconds();


            const actualDate = 
            this.date(day) + '/' + 
            this.date(month) + '/' + 
            today.getFullYear() + ' ' + 
            this.date(h) + ':' +
            this.date(m) + ':' + 
            this.date(s);
            
            return actualDate;
        },

        // FUNZIONE DI CONTROLLO PER EVITARE PROBLEMI DI FORMAT NELLA DATA
        date(n){
            
            if(n < 10){
                return '0' + n;
            }
            return n
        } */

    }
})


/* 
    Esercizio di oggi: Boolzapp
    nome repo: vue-boolzapp
    Milestone 1
    Replica della grafica con la possibilit?? di avere messaggi scritti dall???utente (verdi) e dall???interlocutore (bianco) assegnando due classi CSS diverse
    Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto
    Note:
    - non ?? importante per ora che tutti gli elementi grafici siano presenti, l???importante che la struttura sia come da specifiche
    - l???elenco degli utenti deve essere generato con un v-for e stampare almeno il nome e l???avatar (ultimo messaggio e data per ora possono essere fake)
    - provate sia con tanti e pochi messaggi con messaggi lunghi o corti. La pagina non si deve mai spaccare
 */