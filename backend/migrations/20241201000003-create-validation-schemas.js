/**
 * Create validation schemas for users and messages collections
 */
module.exports = {
  async up(db) {
    // Create validation schema for users collection
    await db.command({
      collMod: "users",
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["email", "fullName", "password"],
          properties: {
            email: {
              bsonType: "string",
              pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
              description: "Email must be a valid email address and is required"
            },
            fullName: {
              bsonType: "string",
              minLength: 2,
              maxLength: 100,
              description: "Full name must be a string between 2 and 100 characters and is required"
            },
            password: {
              bsonType: "string",
              minLength: 6,
              description: "Password must be a string with minimum 6 characters and is required"
            },
            profilePic: {
              bsonType: "string",
              description: "Profile picture must be a string (URL)"
            },
            createdAt: {
              bsonType: "date",
              description: "Created timestamp must be a date"
            },
            updatedAt: {
              bsonType: "date",
              description: "Updated timestamp must be a date"
            }
          }
        }
      },
      validationLevel: "moderate",
      validationAction: "error"
    });

    // Create validation schema for messages collection
    await db.command({
      collMod: "messages",
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["senderId", "receiverId"],
          properties: {
            senderId: {
              bsonType: "objectId",
              description: "Sender ID must be a valid ObjectId and is required"
            },
            receiverId: {
              bsonType: "objectId",
              description: "Receiver ID must be a valid ObjectId and is required"
            },
            text: {
              bsonType: "string",
              maxLength: 1000,
              description: "Message text must be a string with maximum 1000 characters"
            },
            image: {
              bsonType: "string",
              description: "Image URL must be a string"
            },
            createdAt: {
              bsonType: "date",
              description: "Created timestamp must be a date"
            },
            updatedAt: {
              bsonType: "date",
              description: "Updated timestamp must be a date"
            }
          }
        }
      },
      validationLevel: "moderate",
      validationAction: "error"
    });

    console.log('Validation schemas created successfully for users and messages collections');
  },

  async down(db) {
    // Remove validation schemas
    await db.command({
      collMod: "users",
      validator: {},
      validationLevel: "off"
    });

    await db.command({
      collMod: "messages", 
      validator: {},
      validationLevel: "off"
    });

    console.log('Validation schemas removed successfully');
  }
}; 