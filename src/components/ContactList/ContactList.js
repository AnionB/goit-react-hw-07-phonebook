import { useContacts } from 'redux/contactsSlice';
import { useGetContactsQuery, useDelContactMutation } from 'redux/contactsApi';

export default function ContactList() {
  const { filter } = useContacts();
  const { data: contactList, isFetching, isError } = useGetContactsQuery();

  const [delCon, { isLoading: isUpdating }] = useDelContactMutation();
  const filteredContactList = () =>
    contactList.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  return (
    <>
      {isError && <p>Что-то пошло не так...</p>}
      {isFetching && <p>Loading...</p>}
      {contactList && (
        <ul>
          {filteredContactList().map(({ id, name, phone }) => (
            <li key={id}>
              {name} : {phone}
              <button
                type="button"
                disabled={isUpdating}
                onClick={() => delCon(id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
