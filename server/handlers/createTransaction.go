package handlers

import (
	"context"


	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func ExtractAddress(c *fiber.Ctx) error {
        // Extract the userID from the URL parameters
        userID := c.Params("userID")

        // Parse the request body into a struct
        var reqBody struct {
            UserID string `json:"userID"`
        }
        if err := c.BodyParser(&reqBody); err != nil {
            return err
        }

        // Query the MongoDB database for the address associated with the userID
        filter := bson.M{"userID": reqBody.UserID}
        var user struct {
            Address string `bson:"address"`
        }
        err := mongo.Collection.FindOne(context.Background(), filter).Decode(&user)
        if err != nil {
            return err
        }

        // Render the template with the address data
        return c.Render("template", fiber.Map{
            "userID": userID,
            "address": user.Address,
        })
    }