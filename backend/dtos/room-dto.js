class RoomDto{
    id;
    topic;
    roomType;
    speakers;
    ownerId;
    createdAt;

    constructor(room){
        this.id = room._id;
        this.topic = room.topic;
        this.roomType = room.roomType;
        this.ownerId = room.ownerId;
        this.speakers = room.speakers;
        this.createdAi = room.createdAt;
    }
}

module.exports = RoomDto;