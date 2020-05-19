export const seedData = {

    data: [
        {
            notification_Id: 1,
            notification_type: 1,
            sender_id: 123,
            sender_name: "Michael Callahan",
            sender_Pic: 'X', //state or pathway to sender's Avatar?
            user_Id: 234,
            time: "5/19/2020 13:20", //figure out the makeup of their time stamps
            pathway: 'X', //Pathway Here to user's connection Req tab
            campaign_pic: null, //state or pathway to campaign update pic
            emoji: null, //Pathway to emoji? If an emoji used?
            comment: null,
            campaign_update_type: null
        },
        {
            notification_Id: 2,
            notification_type: 2,
            sender_id: 456,
            sender_name: "Fishing Cat Conservancy",
            sender_Pic: 'X', //state or pathway to sender's Avatar?
            user_Id: 234,
            time: "5/19/2020 13:24", //figure out the makeup of their time stamps
            pathway: 'X', //Pathway Here to campaign update
            campaign_pic: 'X', //state or pathway to campaign update pic
            emoji: null, //Pathway to emoji? If an emoji is used?
            comment: null,
            campaign_update_type: "Critical"
        },
        {
            notification_Id: 3,
            notification_type: 1,
            sender_id: 789,
            sender_name: "Zahid Khawaja",
            sender_Pic: 'X', //state or pathway to sender's Avatar?
            user_Id: 234,
            time: "5/19/2020 13:28", //figure out the makeup of their time stamps
            pathway: 'X', //Pathway Here to user's connection Req tab
            campaign_pic: null, //state or pathway to campaign update pic
            emoji: null, //Pathway to emoji? If Emoji used?
            comment: null,
            campaign_update_type: null
        },
        {
            notification_Id: 4,
            notification_type: 2,
            sender_id: 456,
            sender_name: "Everglad Wildlife Foundation",
            sender_Pic: 'X', //Pathway here
            user_Id: 234,
            time: "5/19/2020 13:24", //figure out the makeup of their time stamps
            pathway: 'X', //Pathway Here
            campaign_pic: null, //pathway Here
            emoji: null, //Pathway to emoji? Emoji used,
            comment: null,
            campaign_update_type: "Critical"
        },
    ]

};

// Key: notification_type: Connection request = 1, Campaign Update = 2