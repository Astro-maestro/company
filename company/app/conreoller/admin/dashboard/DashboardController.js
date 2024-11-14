
class DashboardController {

    async dashboardView(req, res) {
        try {
            // Check if the user is authenticated
            const user = req.session.user;
            // Redirect to login if user is not authenticated
            if (!user) {
                return res.redirect('/login');
            }
            // Render the dashboard view with the user data from the session
            res.render('dashboard', { user});
        } catch (error) {
            console.error('Error rendering dashboard:', error);
            res.status(500).send('Server Error');
        }
    }
}

module.exports = new DashboardController();