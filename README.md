# CraftedCreationMarket
CraftedCreationMarket is an Etsy inspired web application. This project is designed to replicate the main functionalities of Etsy, providing a marketplace for users to buy and sell unique items across a range of categories.

## Features
- **Signup/Login**: Users can sign up and make an account.
- **Profile**: Users can update their information on the profile page.
- **Shop**: Sellers can create a shop, edit their shop, and list their products.
- **Dashboard**: Users can explore or search for products with different categories that have been posted by other users.
- **Product Overview**: Shows the the product description, and options to add to favorite or add to cart.
- **Favorites**: Users can save their favorite products for future purchase.
- **Shopping Cart**: List all the products added to cart and the total cost before purchase.
- **Order History**: Lists all the purchases made by the user.
- **Email notification**:
    - Buyers receive an email confirmation after placing an order.
    - Sellers receive an email notification when their product is bought.


## How to run 
1. Clone the repository:
 ```shell
git clone https://github.com/AJ-delaCruz/CraftedCreationMarket
 ```
2. Install dependencies for the backend, kafka-backend, and react-client:
```shell
cd backend && npm install
cd kafka-backend && npm install
cd frontend && npm install
```
3. Setup the environment variables:
- Create a `.env` file in both backend & kafka-backend directory. Add with values:
- `MONGODB_URL`= ...
-  Add in kafka-backend .env file
    - `EMAIL`= ...
     - `EMAIL_PW`= ...
4. Start Kafka ZooKeeper and Kafka broker in seperate terminals:
- Follow the instructions [here](https://kafka.apache.org/quickstart) to download Kafka
```shell
zookeeper-server-start /usr/local/etc/kafka/zookeeper.properties
kafka-server-start /usr/local/etc/kafka/server.properties
```
5. Run the cbackend, kafka-backend, and react-client in separate terminals:
```shell
cd backend && nodemon index.js
cd kafka-backend && nodemon server.js
cd frontend && npm start
```
6. Navigate to http://localhost:3000 in your browser.

## Technologies Used
- MongoDB
- Express
- React
- Node.js
- JWT
- Passport
- Redux
- **Kafkajs**: Handles order processing in the application when users place orders. It's responsible for real-time updates of product quantities and sales information, and also sends email notifications to both buyers and sellers. Kafka improved the application's response time by 53% and the throughput by 103.7% when compared to using REST APIs alone.
- **Nodemailer**: Used for sending email notifications after a purchase.
- **AWS EC2**: Used for cloud hosting
- **JMeter**: Load and stress testing to optimize performance.
