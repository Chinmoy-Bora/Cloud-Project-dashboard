# Step 1: Use the official Node.js image as the base image
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Step 4: Install project dependencies
RUN npm install

# Step 5: Copy the rest of the app's source code into the container
COPY . .

# Step 6: Expose the port React runs on
EXPOSE 3000

# Step 7: Start the development server
CMD ["npm", "start"]
