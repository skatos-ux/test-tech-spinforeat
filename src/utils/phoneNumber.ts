import {ICountryCodes} from "../data/countryCodes";

export type ParsingMethods = 'LIB' | 'STATIC'

export async function getCountryFromPhoneNumber(phoneNumber: string, method: ParsingMethods): Promise<ICountryCodes | undefined>  {
	if (method === 'LIB') {
		return getCountryFromLibrary(phoneNumber)
	}
	else if (method === 'STATIC') {
		return getCountryFromStatic(phoneNumber)
	}
}
async function getCountryFromLibrary(phoneNumber: string) {
	const libPhoneNumber = await import('libphonenumber-js')

	if (libPhoneNumber.isPossibleNumber(phoneNumber)) {
		const infos = libPhoneNumber.parsePhoneNumber(phoneNumber, undefined)

		if (infos.country)
			return { countryCode: infos.country, countryCallingCode: infos.countryCallingCode }
	}


	else return undefined
}

async function getCountryFromStatic(phoneNumber: string) {
	const countryCodes = await import('../data/countryCodes')

	const possibleCountries: ICountryCodes[] = [];

	countryCodes.countryCodes.forEach((country) => {
		if (phoneNumber.startsWith('+' + country.countryCallingCode)) {
			possibleCountries.push(country);
		}
	});

	if (possibleCountries.length) {
		return possibleCountries.reduce((longest, current) => {
			return current.countryCallingCode.length > longest.countryCallingCode.length ? current : longest
		})
	}
	else return undefined
}
