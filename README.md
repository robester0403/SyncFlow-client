<h1>SYNCFLOW</h1>
<hr><p>Designing a comprehensive inventory and equipment management system for large-scale manufacturing environments that commonly involve welding or machining operations. The web application will facilitate logging received materials, assigning these materials to specific locations in the yard or factory, and tracking their issuance throughout the manufacturing process.</p><h2>General Information</h2>
<hr><ul>
<li>SyncFlow is a web-based inventory and equipment management system designed for large-scale manufacturing environments. The system simplifies inventory tracking, location assignment, and material issuance. Built with React.js, Node.js, and MySQL, SyncFlow aims to streamline operations, reduce material loss, and enhance productivity in manufacturing setups.</li>
</ul><h2>Technologies Used</h2>
<hr><ul>
<li>HTML</li>
</ul><ul>
<li>JavaScript</li>
</ul><ul>
<li>React</li>
</ul><ul>
<li>NodeJS</li>
</ul><ul>
<li>TYPESCRIPT</li>
</ul><ul>
<li>SCSS</li>
</ul><ul>
<li>EXPRESS</li>
</ul><h2>Features</h2>
<hr><ul>
<li>Inventory Management</li>
</ul><ul>
<li>Location Assignment</li>
</ul><ul>
<li>Search Functionality</li>
</ul><ul>
<li>Material Issuance and Tracking</li>
## Installation

Clone the Frontend Repository
Open your terminal/command prompt and clone the repository:

```bash
 git clone https://github.com/mandeepharsh/SyncFlow-client.git
```

Clone the Backend Repository
In a separate directory, clone the backend repository:
```bash
 git clone https://github.com/mandeepharsh/SyncFlow-backend.git

```
Install Dependencies

Navigate to both cloned directories individually and install the required dependencies:
```bash
 cd SyncFlow-client
npm install

```
And,
```bash
cd SyncFlow-backend
npm install
```

Setup the Database
Create a new MySQL database. Update the connection details in the config/db.js file in the backend repository.

Setup Environment Variables
In the root of the backend repository, create a .env file and fill it with necessary environment variables. These will likely include your database connection information, any API keys, and other confidential data. Refer to the provided .env.example file for guidance.

Run Database Migrations
In the backend directory, run:
```bash
 npm run migrate

```
Seed the Database
Populate your database with initial data:
```bash
npm run seed

```
Run the Backend Server
```bash
npm run dev
```
Run the Frontend
Navigate to the frontend directory and start the development server:
```bash
cd ../SyncFlow-client
npm run dev
```
<h2>Screenshots</h2>
<h3>DASHBOARD</h3>
<img width="480" alt="Screenshot 2023-06-26 at 9 10 58 AM" src="public/Screenshot 2023-07-04 at 12.59.36 PM.png">
<h3>Geographical Mapping area</h3>
<img width="480" alt="Screenshot 2023-06-26 at 9 11 27 AM" src="public/Screenshot 2023-07-04 at 12.59.49 PM.png">


</ul><h2>Features that can be added</h2>
<hr><ul>
<li>User Access Control: Enhanced user role management and access control functionalities could ensure that users can only access data and functions relevant to their role, thereby increasing security and efficiency.</li>
</ul><ul>
<li>Integration with Other Systems: The current version of SyncFlow works as a standalone system. Integrating it with other systems like ERP (Enterprise Resource Planning) or supply chain management systems could provide a more unified solution.</li>
</ul><ul>
<li>FID Integration: One significant enhancement could be the integration of RFID technology. This would allow for real-time location tracking of small materials kept on shelves or in containers, thus further streamlining the tracking process.</li>
</ul>
