class UserDAO {
    constructor(supabase) {
        this.supabase = supabase;
    }

    async save(user) {
        const { data, error } = await this.supabase
            .from('users')
            .insert([
                { // Insert only the fields that are necessary
                    name: user.name,
                    email: user.email,
                    phone: user.phone
                    // Do NOT include user.id
                }
            ]);

        console.log(`Insert response:`, data, error);

        if (error) {
            console.error('Error saving user:', error);
            throw new Error(`Failed to save user: ${error.message}`);
        }

        if (data && data.length > 0) {
            return data[0].id; // Return the generated ID
        }

        throw new Error('User created but no ID returned');
    }
}

module.exports = (supabase) => new UserDAO(supabase); // Export a function that takes the supabase instance