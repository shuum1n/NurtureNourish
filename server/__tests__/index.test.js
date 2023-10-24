const app = require("../index")
const request = require("supertest")
const jwtHelper = require("../helpers/jwtHelper")
const Profile = require("../models/Profile")
const User = require("../models/User")
const PregnancyData = require("../models/Pregnancy")

let access_token = ""
let wrong_token = ""
beforeAll(async () =>
{
    try
    {
        const newProfile = new Profile({
            name: "test",
            gender: "test",
            birthDate: new Date(),
            pregnancyData: [],
            favoriteRecipes: []
        })
        let savedProfile = await newProfile.save()
        const newUser = new User({
            username: "seededuser",
            email: "seeded@mail.com",
            password: "test123",
            profile: savedProfile._id,
        })
        await newUser.save()
        const newPregnancyData = new PregnancyData({
            startDate: new Date(),
            childrenNumber: 1,
            dailyNutrition: []
        })
        const savedPregnancyData = await newPregnancyData.save()
        savedProfile.pregnancyData.push(savedPregnancyData._id)
        await savedProfile.save()
        access_token = jwtHelper.generateToken({
            username: newUser.username,
            email: newUser.email,
        })
        wrong_token = jwtHelper.generateToken({
            username: "wrong",
            email: "wrong",
        })
        console.log(access_token, "ACCESS TOKEENNN")
    } catch (error)
    {
        console.log(error)
    }
})

beforeEach(async () =>
{
    jest.restoreAllMocks();
});

afterAll(async () =>
{
    await User.deleteMany({});
    await Profile.deleteMany({});
    await PregnancyData.deleteMany({});
});

describe("User Routes", () =>
    describe("POST /register", () =>
    {
        describe("Success", () =>
        {
            test("Should return status 201 and message", async () =>
            {

                const body = {
                    email: "success@mail.com",
                    username: "success",
                    password: "test123",
                }
                const response = await request(app).post("/users/register").send(body)
                expect(response.status).toBe(201)
                expect(response.body).toHaveProperty("message", "User created successfully")

            }, 8000)
        })
        describe("Error", () =>
        {
            test("Should return status 400 and message duplicate key error", async () =>
            {
                {
                    const body = {
                        email: "seeded@mail.com",
                        username: "seededuser",
                        password: "test123",
                    }
                    const response = await request(app).post("/users/register").send(body)
                    expect(response.status).toBe(400)
                    expect(response.body).toHaveProperty("message", "Duplicate key error")
                }
            })
            test("Should return status 400 and message invalid data format", async () =>
            {

                const body = {
                    username: "testing",
                    password: "test123",
                }
                const response = await request(app).post("/users/register").send(body)
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty("message", "Invalid data format")

            }, 8000)
            test("Should return status 400 and message invalid data format", async () =>
            {

                const body = {
                    email: "test@gmail.com",
                    password: "test123",
                }
                const response = await request(app).post("/users/register").send(body)
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty("message", "Invalid data format")

            }, 8000)

        })

    }, 8000),
    describe("POST /login", () =>
    {
        describe("Success", () =>
        {
            test("Login using username", async () =>
            {

                const body = {
                    username: "seededuser",
                    password: "test123",
                }
                const response = await request(app).post("/users/login").send(body)
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty("message", "Successfully logged in")
                expect(response.body).toHaveProperty("access_token", expect.any(String))
                access_token = response.body.access_token;
                console.log(access_token, "DARI TESTING")

            }, 8000)
            test("login using email", async () =>
            {
                const body = {
                    username: "seeded@mail.com",
                    password: "test123",
                }
                const response = await request(app).post("/users/login").send(body)
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty("message", "Successfully logged in")
                expect(response.body).toHaveProperty("access_token", expect.any(String))
            }, 8000)
        })
        describe("Error", () =>
        {
            test("username is wrong", async () =>
            {
                const body = {
                    username: "testing",
                    password: "test",
                }
                const response = await request(app).post("/users/login").send(body)
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty("message", "Invalid credentials, please try again")
            }, 8000)
            test("email is wrong", async () =>
            {
                const body = {
                    username: "test1@mail.com",
                    password: "test",
                }
                const response = await request(app).post("/users/login").send(body)
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty("message", "Invalid credentials, please try again")
            }, 8000)
            test("password field empty", async () =>
            {
                const body = {
                    username: "test"
                }
                const response = await request(app).post("/users/login").send(body)
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty("message", "Invalid credentials, please try again")
            }, 8000)
            test("password is wrong", async () =>
            {
                const body = {
                    username: "seededuser",
                    password: "WRONG",
                }
                const response = await request(app).post("/users/login").send(body)
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty("message", "Invalid credentials, please try again")
            })
        })
    })
)

describe("Profile Routes", () =>
    describe("GET /profiles", () =>
    {
        describe("Success", () =>
        {
            test("Should return status 200 and data", async () =>
            {
                const headers = {
                    access_token: access_token
                }
                const response = await request(app).get("/profiles").set(headers)
                expect(response.status).toBe(200)
                console.log(response.body, "RESPONSE BODY")
                expect(response.body).toHaveProperty("name", expect.any(String))
                expect(response.body).toHaveProperty("gender", expect.any(String))
                expect(response.body).toHaveProperty("birthDate", expect.any(String))
                expect(response.body).toHaveProperty("pregnancyData", expect.any(Array))
                expect(response.body).toHaveProperty("favoriteRecipes", expect.any(Array))
            }, 8000)
        })
        describe("Error", () =>
        {
            test("Access token is wrong", async () =>
            {
                const headers = {
                    access_token: "123"
                }
                const response = await request(app).get("/profiles").set(headers)
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty("message", "jwt malformed")
            }, 8000)
            test("No access token", async () =>
            {
                const response = await request(app).get("/profiles")
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty("message", "Invalid token")
            }, 8000)
            test("Access token is valid but user not found", async () =>
            {
                const response = await request(app).get("/profiles").set({ access_token: wrong_token })
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty("message", "Invalid token")
            }, 8000)
            test("Invalid profile", async () =>
            {
                jest.spyOn(Profile, "findById").mockRejectedValue("Error")
                const headers = {
                    access_token: access_token
                }
                const response = await request(app).get("/profiles").set(headers)
                expect(response.status).toBe(500)
                expect(response.body).toHaveProperty("message", "Internal Server Error")
            }, 8000)
        })
    }),
    describe("PUT /profiles", () =>
    {
        describe("Success", () =>
        {
            test("Update profile success", async () =>
            {
                const body = {
                    name: "test",
                    gender: "test",
                    date: new Date()
                }
                const headers = {
                    access_token: access_token
                }
                const response = await request(app).put("/profiles").set(headers).send(body)
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty("message", "Profile updated successfully")
            }, 8000)
        }),
            describe("Error", () =>
            {
                test("Update profile failure", async () =>
                {
                    const headers = {
                        access_token: access_token
                    }
                    const body = {
                        name: "test",
                        gender: "test",
                    }
                    const response = await request(app).put("/profiles").set(headers).send(body)
                    expect(response.status).toBe(400)
                    expect(response.body).toHaveProperty("message", "Invalid data format")
                })
            })
    })
)

describe("Pregnancy Routes", () =>
    describe("GET /pregnancy", () =>
    {
        describe("Success", () =>
        {
            test("Get pregnancy data", async () =>
            {
                const headers = {
                    access_token: access_token
                }
                const body = {
                    startDate: new Date()
                }
                const response = await request(app).get("/pregnancies").set(headers).send(body)
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty("startDate", expect.any(String))
                expect(response.body).toHaveProperty("childrenNumber", expect.any(Number))
                expect(response.body).toHaveProperty("dailyNutrition", expect.any(Array))
            }, 8000)
        })
    }),
    describe("POST /pregnancy", () =>
    {
        describe("Success", () =>
        {
            test("Add pregnancy data", async () =>
            {
                const headers = {
                    access_token: access_token
                }
                const body = {
                    startDate: new Date()
                }
                const response = await request(app).post("/pregnancies").set(headers).send(body)
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty("message", "Pregnancy data added successfully")
            }, 8000)
        })
        describe("Error", () =>
        {
            test("Fail adding pregnancy data", async () =>
            {
                const headers = {
                    access_token: access_token
                }
                const body = {
                }
                const response = await request(app).post("/pregnancies").set(headers).send(body)
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty("message", "Invalid pregnancy data")
            }, 8000)
        })
    })
)