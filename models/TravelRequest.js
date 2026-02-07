import mongoose from "mongoose";

const TravelRequestSchema = new mongoose.Schema(
    {
        name: String,
        ageGroup: String,
        currentLocation: String,
        travelExperience: String,

        personality: [String],
        destinationTypes: [String],
        foodPreferences: [String],
        interests: [String],

        tripDuration: String,
        dailyTravelTime: String,

        aiDestination: String,
        aiFood: String,
        aiReason: String,
    },
    { timestamps: true }
);

export default mongoose.model("TravelRequest", TravelRequestSchema);
