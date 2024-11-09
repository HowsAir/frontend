import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
    getCountries,
    CountryCode,
    parsePhoneNumberFromString,
} from 'libphonenumber-js';
import { Input } from './Input';
import Flag from 'react-world-flags';


interface PhoneInputProps {
    name: string;
    children: React.ReactNode; // Placeholder text
}

const PhoneInput = ({ name, children }: PhoneInputProps) => {
    const [selectedCountry, setSelectedCountry] = useState<CountryCode>('ES'); // Default to 'ES'
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const countries = getCountries(); 

    // Validate phone number based on selected country
    const validatePhoneNumber = (value: string) => {
        if (!value) return 'El número de teléfono es obligatorio';

        const phoneNumber = parsePhoneNumberFromString(value, selectedCountry);
        if (phoneNumber && phoneNumber.isValid()) {
            return true;
        } else {
            return `Teléfono no válido para ${selectedCountry}`;
        }
    };

    const handleCountryChange = (countryCode: CountryCode) => {
        setSelectedCountry(countryCode);
        setIsDropdownOpen(false);
    };

    return (
        <div className="relative inline-flex h-fit items-center">
            {/* Phone number input */}
            <Input
                name={name}
                type="tel"
                validate={validatePhoneNumber}
                customClass="w-full"
            >
                {children}
            </Input>

            {/* Country flag and code selector */}
            <div
                className="absolute right-0 top-8 flex h-10 cursor-pointer items-center rounded-r-lg bg-transparent px-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <Flag
                    code={selectedCountry}
                    alt="country-flag"
                    className="h-6 w-6"
                />
                <img
                    src="/icons/dropdown-arrow.svg"
                    alt="dropdown-arrow"
                    className="ml-2 h-3 w-3"
                />
                <span className="ml-2 text-lg">
                    {
                        parsePhoneNumberFromString('1', selectedCountry)
                            ?.countryCallingCode
                    }
                </span>
            </div>

            {/* Country selector dropdown */}
            {isDropdownOpen && (
                <div className="absolute right-0 top-16 z-10 h-52 w-fit overflow-auto rounded-md border bg-white shadow-lg">
                    {countries.map((countryCode) => (
                        <div
                            key={countryCode}
                            onClick={() =>
                                handleCountryChange(countryCode as CountryCode)
                            }
                            className="hover:bg-gray-200 flex cursor-pointer items-center p-2"
                        >
                            <Flag
                                code={countryCode}
                                alt={`${countryCode}-flag`}
                                className="mr-2 h-6 w-6"
                            />
                            <span>{countryCode}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PhoneInput;
