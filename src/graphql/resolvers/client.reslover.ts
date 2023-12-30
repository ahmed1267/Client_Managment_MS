import { ClientModel, IClient } from '../../models/client.model'
import * as EmailValidator from 'email-validator'

export const resolvers = {
    Client: {
        //CreatedAt Date Formatting
        createdAt: (client: any) => {
            return new Date(client.createdAt).toISOString();
        },
        //UpdatedAt Date Formatting
        updatedAt: (client: any) => {
            return new Date(client?.updatedAt).toISOString() || null;
        }
    },

    Query: {
        //Get One Client By ID
        getOneClient: async (_: any, { _id }: { _id: string }): Promise<IClient | null> => {
            try {
                const foundClient = await ClientModel.findById(_id).catch(err => {
                    console.log(err)
                    throw new Error('Unexpected error happened while getting the Client!')
                })

                //If there is no client with the given ID, throw an error.
                if (!foundClient) {
                    throw new Error("Client Not Found!")
                }
                return foundClient;
            } catch (error) {
                console.log(error)
                throw new Error("Getting the Client Failed!");
            }
        },

        //Get All Clients
        getManyClients: async (): Promise<IClient[] | null> => {
            try {
                const clients = await ClientModel.find().catch(err => {
                    console.log(err)
                    throw new Error('Unexpected error happened while getting Clients!')
                })
                return clients
            } catch (error) {
                console.log(error)
                throw new Error("Getting Clients Failed");

            }
        }
    },

    Mutation: {
        //Create New Client
        createClient: async (_: any, { input }: { input: IClient }): Promise<string> => {
            try {
                //Email Format Validation
                if (!EmailValidator.validate(input.email)) {
                    throw new Error("Invalid Email Address!")
                }
                //Check if the email already exists in the database.
                const existingEmail = await ClientModel.findOne({ email: input.email }).catch(err => {
                    {
                        console.log(err)
                        throw new Error("Unexpected Error happened while creating the client!")
                    }
                })
                if (existingEmail) {
                    throw new Error("Email Already Exists!")
                }
                //Create a new client and save it to the database.
                const newClient = new ClientModel(input);
                await newClient.save().catch(err => {
                    console.log(err)
                    if (err.code == 11000)
                        throw new Error("Client Already Exists!")
                    else
                        throw new Error("Unexpected Error happened while creating the client!");
                })
                return "Client Created Successfully!"
            } catch (error) {
                console.log(error)
                throw new Error("Creating Client Failed!");
            }
        },

        //Update Client By ID
        updateClient: async (_: any, { input }: { input: IClient }): Promise<string> => {
            try {
                //Email Format Validation
                if (input.email != null && !EmailValidator.validate(input.email)) {
                    throw new Error("Invalid Email Address!")
                }
                const { _id, ...updateData } = input
                //Update the client in the database.
                const foundClient = await ClientModel.findByIdAndUpdate(_id, updateData).catch(err => {
                    console.log(err)
                    throw new Error("Unexpected Error happened while updating the client!");
                })

                //Check if the client exists in the database.
                if (!foundClient) {
                    throw new Error("Client Not Found!")
                }
                return "Client Updated Successfully!"
            } catch (error) {
                console.log(error)
                throw new Error("Updating Client Failed!");

            }
        }
    }
}

