const ContactRepository = require("../repositorys/ContactRepository");

class ContactController {
    async index(request, response) {
        const { orderBy } = request.query;
        const contacts = await ContactRepository.findAll(orderBy);

        response.json(contacts);
    }

    async show(request, response) {
        const { id } = request.params;

        const contact = await ContactRepository.findById(id);

        if (!contact) {
            return response.status(404).json({ error: "Contact not found" });
        }

        response.json(contact);
    }

    async store(request, response) {
        const { name, email, phone, category_id } = request.body;

        if (!name) {
            return response.status(400).json({ error: "name is required" });
        }

        const contactsExists = await ContactRepository.findByEmail(email);

        if (contactsExists) {
            return response
                .status(400)
                .json({ error: "this email is already in use" });
        }

        const contact = await ContactRepository.create({
            name,
            email,
            phone,
            category_id,
        });

        response.status(201).json(contact);
    }

    async update(request, response) {
        //Editar um registro
        const { id } = request.params;
        const { name, email, phone, category_id } = request.body;

        const contactsExists = await ContactRepository.findById(id);
        if (!contactsExists) {
            return response
                .status(404)
                .json({ error: "This contact does not exist." });
        }

        if (!name) {
            return response.status(400).json({ error: "name is required" });
        }

        const contactByEmail = await ContactRepository.findByEmail(email);

        if (contactByEmail && contactByEmail.id !== id) {
            return response
                .status(400)
                .json({ error: "this email is already in use" });
        }

        const contact = await ContactRepository.update(id, {
            name,
            email,
            phone,
            category_id,
        });

        response.json(contact);
    }

    async delete(request, response) {
        const { id } = request.params;

        const contact = await ContactRepository.findById(id);

        if (!contact) {
            return response.status(404).json({ error: "Contact not found" });
        }

        await ContactRepository.delete(id);

        //204: No content
        response.sendStatus(204);
    }
}

module.exports = new ContactController();
