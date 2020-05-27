// export const checkNew = () => {
//   if(seedData.data.new_notification == true){
//     return seedData.data.new_notification = false;
//   }
// }

export const seedData = {
  data: [
    {
      notification_Id: 1,
      notification_type: 1,
      sender_id: 127,
      sender_name: 'Daniel Lazarov',
      sender_Pic:
        'https://keyconservation.s3.us-west-1.amazonaws.com/files/1586369603266_photo.png', //state or pathway to sender's Avatar?
      user_Id: 234,
      time: '2020-05-19T21:05:36.093Z', //this comes from moment() not sure yet if it needs to be a string
      pathway: 'Connections', //Pathway to connections tab will be Connections
      campaign_pic: null, //state or pathway to campaign update pic
      emoji: null, //Pathway to emoji? If an emoji used?
      comment: null,
      campaign_update_type: null,
      new_notification: true,
    },
    {
      notification_Id: 2,
      notification_type: 2,
      sender_id: 14,
      sender_name: 'Sylvester Foundation',
      sender_Pic:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', //state or pathway to sender's Avatar?
      user_Id: 234,
      time: '2020-05-19T21:07:45.933Z', //this comes from moment() not sure yet if it needs to be a string
      pathway: 'X', //Pathway Here to campaign update
      campaign_pic:
        'https://keyconservation.s3.us-west-1.amazonaws.com/files/1589742510769_photo.jpg', //state or pathway to campaign update pic
      emoji: null, //Pathway to emoji? If an emoji is used?
      comment: null,
      name: 'Restoring our habitats',
      urgency: 'Critical',
      new_notification: true,
    },
    {
      notification_Id: 3,
      notification_type: 1,
      sender_id: 128,
      sender_name: 'Leah Kelley',
      sender_Pic:
        'https://keyconservation.s3.us-west-1.amazonaws.com/files/1589910890977_photo.png', //state or pathway to sender's Avatar?
      user_Id: 234,
      time: '2020-05-20T21:07:45.933Z', //this comes from moment() not sure yet if it needs to be a string
      pathway: 'Connections', //Pathway to connections tab will be Connections
      campaign_pic: null, //state or pathway to campaign update pic
      emoji: null, //Pathway to emoji? If Emoji used?
      comment: null,
      campaign_update_type: null,
      new_notification: true,
    },
    {
      notification_Id: 4,
      notification_type: 2,
      sender_id: 133,
      sender_name: 'Bat Action Network',
      sender_Pic:
        'https://keyconservation.s3.us-west-1.amazonaws.com/files/1586378882572_photo.png', //Pathway here
      user_Id: 234,
      time: '2020-04-08T20:48:56.687436+00:00', //this comes from moment() not sure yet if it needs to be a string
      pathway: 'X', //Pathway Here
      campaign_pic:
        'https://keyconservation.s3.us-west-1.amazonaws.com/files/1586379060648_photo.jpg', //pathway Here
      emoji: null, //Pathway to emoji? Emoji used,
      comment: null,
      name: 'Restoring our habitats',
      urgency: 'Critical',
      new_notification: true,
    },
  ],
};

// Key: notification_type: Connection request = 1, Campaign Update = 2
