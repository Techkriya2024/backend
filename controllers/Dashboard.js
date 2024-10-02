const User = require("../models/User");
const Events = require("../models/Events");
const Club = require("../models/Club");


exports.fetchAllEventsWithRegisteredAndVisitedUsers = async(req,res) => {
    try{

        const events = await Events.find({})
                    .populate({
                        path : "club_id",
                        select : "club_name",
                    })
                    .populate({
                        path : "registered_users",
                        select : "_id",
                    })
                    .populate({
                        path : "visited_users",
                        select : "_id",
                    });
        const eventCounts = events.map(event => ({
            club_name : event.club_id.club_name,
            registered_count : event.registered_users.length,
            visited_count : event.visited_users.length,
        }));

        return res.status(200).json({
            success : true,
            data : eventCounts,
            message : "All Events are fetched successfully including the count of registered users and visited users."
        })

    }
    catch(e){
        console.error(e);
        return res.status(500).json({
            success : false,
            message : "Unable to fetch the events.Please try again!."
        })
    }
}

exports.fetchEventById = async(req,res) => {
    try{
        const {eventId} = req.body;

        if(!eventId){
            return res.status(404).json({
                success : false,
                message : "EventId was not found."
            })
        }

        const event = await Events.findById(eventId)
                        .populate({
                            path : "registered_users",
                            select : "name reg_no roll_no",
                        })
                        .populate({
                            path : "visited_users",
                            select : "name reg_no roll_no",
                        });
        if(!event){
            return res.status(404).json({
                success : false,
                message : "Event Not Found."
            });
        };
        return res.status(200).json({
            success : true,
            data : event,
            message : "Successfully fetched the event by event Id."
        })
    }
    catch(e){
        console.error(e);
        return res.status(500).json({
            success : false,
            message : "Unable to fetch the event by event Id.Please try again!."
        })
    }
}

exports.fetchAllEventsConductedByClubs = async(req,res) => {
    try{

        const clubs = await Club.find({})
                    .populate({
                        path : "events",
                        select : "event_name registered_users visited_users"
                    });

        const clubEvents =  clubs.map(club => {
            const eventDetails = club.events.map(event => ({
                event_name : event.event_name,
                registered_count : event.registered_users.length,
                visited_count : event.visited_users.length,
            }))

            return {
                club_name : club.club_name,
                events : eventDetails,
            }
        })


        return res.status(200).json({
            success : true,
            data : clubEvents,
            message : "Successfully fetched the all club events by the registered and visited users count and event name.",
        });
    }
    catch(e){
        console.error(e);
        return res.status(500).json({
            success : false,
            message : "Unable to fetch the club events.Please try again!.",
        })
    }
}

exports.fetchUserStastistics = async(req,res) => {
    try{
        const totalUserAccounts = await User.aggregate([
            {
                $group : {
                    _id : null,
                    count : { $sum : 1 },
                }
            }
        ])

        const totalUserAccountsCount = totalUserAccounts.length > 0 ? totalUserAccounts[0].count : 0 ;

        const totalOutSidersAccounts = await User.aggregate([
            {
                $match : {
                    outsiders : true,
                }
            },
            {
                $group : {
                    _id : null,
                    count : {$sum : 1},
                }
            }
        ]);

        const totalOutSidersAccountsCount = totalOutSidersAccounts.length > 0 ? totalOutSidersAccounts[0].count : 0 ;

        const totalVisitedAccounts = await Events.aggregate([
            {
                $project : {
                    visited_count : {$size : "$visited_users"}
                }
            },
            {
                $group : {
                    _id : null,
                    count : {$sum : "$visited_count"}
                }
            }
        ]);

        const totalVisitedAccountsCount = totalVisitedAccounts.length > 0 ? totalVisitedAccounts[0].count : 0 ;

        const totalRegisteredAccounts = await Events.aggregate([
            {
                $project : {
                    registered_count : {$size : "$registered_users"}
                }
            },
            {
                $group : {
                    _id : null,
                    count : {$sum : "$registered_count"}
                }
            }
        ]);

        const totalRegisteredAccountsCount = totalVisitedAccounts.length > 0 ? totalRegisteredAccounts[0].count : 0 ;

        return res.status(200).json({
            success : true,
            data : {
                total_User_Accouts_Count : totalUserAccountsCount,
                total_Outsiders_Account_Count : totalOutSidersAccountsCount,
                total_Visited_Account_Count : totalVisitedAccountsCount,
                total_Registered_Account_Count : totalRegisteredAccountsCount,
            },
            message : "Successfully Fetched the total number of users,total number of outsiders,total number of visited users,total number of registered users."
        })
    }
    catch(e){
        console.error(e);
        return res.status(500).json({
            success : false,
            message : "Unable to fetch the total statistics.Please try again!."
        })
    }
}