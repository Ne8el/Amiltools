//----------------------------------------------- REQUIRE
const config = require('./config/config.json')


//----------------------------------------------- Controllers
const UserController = require('./controllers/user_controller')
const ReportController = require('./controllers/report_controller')
const TaskController = require('./controllers/task_controller')
const TaskGroupController = require('./controllers/taskgroup_controller')
const BugTrackerController = require('./controllers/bugtracker_controller')
const CalendarController = require('./controllers/calendar_controller')
const AstuceController = require('./controllers/astuce_controller')

//----------------------------------------------- MIDDLEWARE
const mid = require('./middleware/mid_secure_auth')


//------------------------------------------------------------------------------------------------------ START MODEL

module.exports = function(server){

    //WELCOME
    server.get(`${config.routeApi}`, (req, res) => {
        res.status(200).json(
            {
                "success": true,
                "message": "Welcome to my API for Amiltool's"
            }
        )
    })

    //-----------------------------------------------------------------------------------------

    //USER ROUTE FREE
        //Display USER
        server.get(`${config.routeApi}user/:api_key`, mid.secure_auth_api, mid.secure_admin_api, UserController.findAllUserController)
        server.get(`${config.routeApi}user/:id/:api_key`, mid.secure_auth_api, mid.secure_admin_api, UserController.findOneUserController)
        server.get(`${config.routeApi}finduser/:name`, UserController.findUserProfilesController)
        server.get(`${config.routeApi}searchUser/:request`, UserController.searchUserController)

        //Control User
        server.post(`${config.routeApi}user/add/:api_key`, mid.secure_auth_api, mid.secure_admin_api, UserController.addUserController)
        server.put(`${config.routeApi}user/update/:id/:api_key`, mid.secure_auth_api, mid.secure_admin_api, UserController.updateUserController)
        server.delete(`${config.routeApi}user/delete/:id/:api_key`, mid.secure_auth_api, mid.secure_admin_api, UserController.deleteUserController)
        server.get(`${config.routeApi}getrole/*`, UserController.roleUserController)
        server.get(`${config.routeApi}getAllrole/:api_key`, mid.secure_auth_api, mid.secure_admin_api, UserController.allRoleUserController)
        server.post(`${config.routeApi}user/generateApiKey/:api_key`, mid.secure_auth_api, mid.secure_admin_api, UserController.generateApiKeyUserController)
        server.delete(`${config.routeApi}user/deleteApiKey/:id/:api_key`, mid.secure_auth_api, mid.secure_admin_api, UserController.deleteApiKeyUserController)


        //Connect User
        server.post(`${config.routeApi}user/log/`, UserController.logUserController)
        server.get(`${config.routeApi}user/log/token/:token`, UserController.logUserWithTokenController)


    //-----------------------------------------------------------------------------------------

    //REPORT ROUTE

        //Display Report
        server.get(`${config.routeApi}report`, ReportController.findAllReportController)
        server.get(`${config.routeApi}report/:id`, ReportController.findOneReportController)
        server.get(`${config.routeApi}report/find/lastreport`, ReportController.findLastReportController)
        server.get(`${config.routeApi}searchReport/:request`, ReportController.searchReportController)

        //Control Report
        server.post(`${config.routeApi}report/add/:api_key`, mid.secure_auth_api, mid.secure_manager_api, ReportController.addReportController)
        server.put(`${config.routeApi}report/update/:id/:api_key`, mid.secure_auth_api, mid.secure_manager_api, ReportController.updateReportController)
        server.delete(`${config.routeApi}report/delete/:id/:api_key`, mid.secure_auth_api, mid.secure_manager_api, ReportController.deleteReportController)

        //Options
        server.get(`${config.routeApi}report/count/all`, ReportController.countReportController)
        server.get(`${config.routeApi}report/lastid/last`, ReportController.lastIDReportController)

    //-----------------------------------------------------------------------------------------

    //TASK ROUTE
    //Display Task
    server.get(`${config.routeApi}task`, TaskController.findAllTaskController)
    server.get(`${config.routeApi}task/:id`, TaskController.findOneTaskController)

    //Control Task
    server.post(`${config.routeApi}task/add`, TaskController.addTaskController)
    server.put(`${config.routeApi}task/update/:id`, TaskController.updateTaskController)
    server.delete(`${config.routeApi}task/delete/:id`, TaskController.deleteTaskController)

    //Options
    server.get(`${config.routeApi}task/count/all`, TaskController.countTaskController)

    server.get(`${config.routeApi}taskgroup`, TaskGroupController.findAllTaskGroupController)
    server.put(`${config.routeApi}taskgroup/updatepos/:id`, TaskGroupController.updatePositionTaskGroupController)
    server.put(`${config.routeApi}taskgroup/update/:id`, TaskGroupController.updateTaskGroupController)
    //-----------------------------------------------------------------------------------------

    //BUGTRACKER ROUTE
        //Display Bug
        server.get(`${config.routeApi}bugtracker`, BugTrackerController.findAllBugTrackerController)
        server.get(`${config.routeApi}bugtracker/author/:id_user`, BugTrackerController.findAllBugTrackerWhereIDController)
        server.get(`${config.routeApi}bugtracker/:id`, BugTrackerController.findOneBugTrackerController)
        server.get(`${config.routeApi}searchBugTracker/:idUser/:request`, BugTrackerController.searchBugTrackerController)

        server.get(`${config.routeApi}bugtracker/priority/:priority`, BugTrackerController.requestPriorityBugTrackerController)
        server.get(`${config.routeApi}bugtracker/priority/:priority/:id`, BugTrackerController.requestPriorityWithIDBugTrackerController)

        //Control Bug
        server.post(`${config.routeApi}bugtracker/add`, BugTrackerController.addBugTrackerController)
        server.put(`${config.routeApi}bugtracker/update/:id`, BugTrackerController.updateBugTrackerController)
        server.delete(`${config.routeApi}bugtracker/delete/:id`, BugTrackerController.deleteBugTrackerController)

        //Options
        server.get(`${config.routeApi}bugtracker/count/all`, BugTrackerController.countBugTrackerController)
        server.get(`${config.routeApi}bugtracker/count/:id`, BugTrackerController.countBugTrackerWithIDController)

    //-----------------------------------------------------------------------------------------

    //CALENDAR ROUTE
        //Display Calendar
        server.post(`${config.routeApi}calendar/getEvents`, CalendarController.getEventsController);
        server.post(`${config.routeApi}calendar/setEvent`, CalendarController.addEventController);
        server.delete(`${config.routeApi}calendar/delete`, CalendarController.removeEventController);
        server.get(`${config.routeApi}searchCalendar/:idUser/:request`, CalendarController.searchCalendarController)

    //-----------------------------------------------------------------------------------------

    //Other
        server.get(`${config.routeApi}astuce/all`, AstuceController.findAllAstucesController);



    //Default
    server.use((req, res) => {
        res.status(404).json(
            {
                "success": false,
                "message": "Check Documentation of API"
            }
        )
    })

}
