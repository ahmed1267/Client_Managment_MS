import { ClientModel, IClient } from '../../models/client.model'

export const resolvers= {
    Client: {
        createdAt: (client: any) => {
          return new Date(client.createdAt).toISOString();
        }
    },
    
    Query: {
        getOneClient: async (_: any, { _id }: { _id: string }): Promise <IClient | null> => {
            try {
                return await ClientModel.findById(_id).catch(err=>{
                    console.log(err)
                    throw new Error('Unexpected error happened while getting the Client!')
                })
            } catch (error) {
                console.log(error)
                throw new Error("Getting the Client Failed!");  
            }
        },

        getManyClients: async (): Promise<IClient[] | null> => {
            try {
                const clients= await ClientModel.find().catch(err=> {
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
        createClient: async(_: any, args: IClient): Promise<string> =>{
            try {
                const newClient = new ClientModel({
                    address: args.address,
                    dataLifeTime: args.dataLifeTime,
                    email: args.email,
                    maintenanceAppEnabled: args.maintenanceAppEnabled,
                    name: args.name,
                    phone: args.phone,
                    protectAgainstAutoDisable: args.protectAgainstAutoDisable,
                    type: args.type
                });
                
                // Save the new client record to the database
                const savedClient = await ClientModel.create(newClient).catch(err=> {
                    console.log(err)
                    throw new Error("Unexpected Error happened while creating the client!");
                })
                console.log(savedClient)
                return "Client Created Successfully!"
            } catch (error) {
                console.log(error)
                throw new Error("Creating Client Failed!");                
            }
        },

        updateClient: async(_: any, {args}: { args: IClient}): Promise<string> =>{
            try {
                const {_id, ...updateData}= args
                await ClientModel.findByIdAndUpdate(_id, updateData).catch(err=> {
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

