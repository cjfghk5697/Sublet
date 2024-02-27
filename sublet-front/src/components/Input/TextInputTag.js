export const TextInputTag = ({ id, label, placeholder, required }) => (
  <div>
    <label
      for={id}
      className="block mb-2 text-sm font-medium text-gray-900 float-left"
    >
      {label}
    </label>
    {required ? (
      <input
        type="text"
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    ) : (
      <input
        type="text"
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
      />
    )}
  </div>
);

export const TextAreaTag = ({ id, label, placeholder, required }) => (
  <div>
    <label
      for={id}
      className="block mb-2 text-sm font-medium text-gray-900 float-left"
    >
      {label}
    </label>
    {required ? (
      <textarea
        type="text"
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    ) : (
      <textarea
        type="text"
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
      />
    )}
  </div>
);

export const NumberInputTag = ({ id, label, placeholder, required, handleState}) => (
  <div>
    <label
      for={id}
      className="block mb-2 text-sm font-medium text-gray-900 float-left"
    >
      {label}
    </label>
    {required ? (
      <input
        type="number"
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        min="1"
        max="2147483640"
        step="1"
        onChange={handleState}
        placeholder={placeholder}
        required
      />
    ) : (
      <input
        type="number"
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        min="1"
        max="2147483640"
        step="1"
        onChange={handleState}
        placeholder={placeholder}
      />
    )}
  </div>
);

<input type="number" />
