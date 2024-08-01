- **Project Overview:**  
Developed a robust e-commerce platform designed to cater to three distinct user roles: Customer, Seller, and Admin. The platform is built using .NET Entity Framework with a Code First approach for the backend, Angular for the frontend, and MS SQL as the database.

- **Roles and Functionality:**
  - **Customer:** Customers can browse a wide range of products, view product details, add items to their cart, and complete purchases seamlessly. The user interface is designed to be intuitive, ensuring a smooth shopping experience.
  - **Seller:** Sellers are provided with a dedicated interface to manage their product listings. They can add new products, edit existing ones, and delete those no longer available. Sellers have full control over their inventory, allowing them to update product details such as descriptions, images, and pricing.
  - **Admin:** The Admin role is crucial for maintaining the platform’s integrity. Admins have the authority to manage the entire website, including overseeing seller activities. They can activate or deactivate sellers based on performance or compliance. When a seller is deactivated, their ability to add or manage products is suspended, ensuring that only approved sellers contribute to the platform.

- **Technical Implementation:**  
  - **Backend:** Utilized .NET Entity Framework with a Code First approach to create a flexible and scalable data model. The backend logic handles CRUD operations, user authentication, and role-based access control.
  - **Frontend:** Built using Angular, the frontend delivers a responsive and dynamic user experience. Angular’s powerful data-binding and component-driven architecture allow for efficient rendering of product listings, user actions, and real-time updates.
  - **Database:** Implemented using MS SQL, the database is structured to support complex relationships between users, products, orders, and roles. Stored procedures and queries are optimized for performance, ensuring fast data retrieval and transaction processing.

- **Challenges and Solutions:**  
  - **Challenge:** Managing role-based access control to ensure that each user type has the appropriate level of access and functionality.
  - **Solution:** Implemented a robust authentication and authorization system that checks user roles and permissions at both the frontend and backend levels.
  - **Challenge:** Ensuring that deactivated sellers cannot manipulate or access their products after losing privileges.

