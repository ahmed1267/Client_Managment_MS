import { ClientModel, IClient } from '../../models/client.model'
import * as EmailValidator from 'email-validator'

export const resolvers = {
    Client: {
        createdAt: (client: any) => {
            return new Date(client.createdAt).toISOString();
        },
        updatedAt: (client: any) => {
            return new Date(client?.updatedAt).toISOString() || null;
        }
    },

    Query: {
        getOneClient: async (_: any, { _id }: { _id: string }): Promise<IClient | null> => {
            try {
                const foundClient = await ClientModel.findById(_id).catch(err => {
                    console.log(err)
                    throw new Error('Unexpected error happened while getting the Client!')
                })
                if (!foundClient) {
                    throw new Error("Client Not Found!")
                }
                return foundClient;
            } catch (error) {
                console.log(error)
                throw new Error("Getting the Client Failed!");
            }
        },

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
        createClient: async (_: any, { input }: { input: IClient }): Promise<string> => {
            try {
                if (!EmailValidator.validate(input.email)) {
                    throw new Error("Invalid Email Address!")
                }
                const existingEmail = await ClientModel.findOne({ email: input.email }).catch(err => {
                    {
                        console.log(err)
                        throw new Error("Unexpected Error happened while creating the client!")
                    }
                })
                if (existingEmail) {
                    throw new Error("Email Already Exists!")
                }
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

        updateClient: async (_: any, { input }: { input: IClient }): Promise<string> => {
            try {
                if (input.email != null && !EmailValidator.validate(input.email)) {
                    throw new Error("Invalid Email Address!")
                }
                const { _id, ...updateData } = input
                const foundClient = await ClientModel.findById(_id).catch(err => {
                    console.log(err)
                    throw new Error("Unexpected Error happened while updating the client!");

                })
                if (!foundClient) {
                    throw new Error("Client Not Found!")
                }
                await ClientModel.findByIdAndUpdate(_id, updateData).catch(err => {
                    console.log(err)
                    throw new Error("Unexpected Error happened while updating the client!");
                })

                return "Client Updated Successfully!"
            } catch (error) {
                console.log(error)
                throw new Error("Updating Client Failed!");

            }
        }
    }
}

