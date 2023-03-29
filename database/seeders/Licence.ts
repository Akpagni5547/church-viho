import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import LicenseKey from 'license-key-gen'
// const generateLicense = require('generate-license')

export default class extends BaseSeeder {
  public async run() {
    // Générer une clé de licence valide pour 3 mois
    // const licenseKey3Months = generateLicense('3m')
    // console.log(licenseKey3Months)
    // Générer une clé de licence valide pour 3 mois
    const licenseKey3Months = LicenseKey.createLicense({
      info: {
        name: 'My App',
        email: 'john.doe@example.com',
        company: 'My Company',
      },
      prodCode: 'CHURCHV1',
      appVersion: '1.0',
    })
    const licence = licenseKey3Months.license
    console.log(licenseKey3Months)
    console.log(licence)
    // try {
    //   const testValidate = LicenseKey.validateLicense(
    //     {
    //       info: {
    //         name: 'My App',
    //         email: 'john.doe@example.com',
    //         company: 'My Company',
    //       },
    //       prodCode: 'CHURCHV1',
    //       appVersion: '1.0',
    //     },
    //     'S31Y6-7AV54-UZUW1-B675B-F05C5-8A3DC'
    //   )
    // } catch (e) {
    //   console.log('ddddd')
    //   console.log(e)
    // }

    // Générer une clé de licence valide pour une durée de vie
    // const licenseKeyLifetime = LicenseKey.create({
    //   seed: 'my-seed-string',
    //   salt: 'my-salt-string',
    //   length: 25,
    //   years: 100,
    //   months: 0,
    //   days: 0,
    //   count: 1,
    // })

    // Générer une clé de licence valide pour 1 an à partir du moment où elle est utilisée
    // const licenseKey1Year = LicenseKey.create({
    //   seed: 'my-seed-string',
    //   salt: 'my-salt-string',
    //   length: 25,
    //   years: 1,
    //   months: 0,
    //   days: 0,
    //   count: 1,
    // })

    // Stocker la durée de validité de chaque clé de licence dans une base de données ou un fichier de configuration
    // const licenseKeys = [
    //   {
    //     key: licenseKey3Months,
    //     validFor: '3 months',
    //   },
    //   {
    //     key: licenseKeyLifetime,
    //     validFor: 'lifetime',
    //   },
    //   {
    //     key: licenseKey1Year,
    //     validFor: '1 year from activation',
    //   },
    // ]
    // console.log(licenseKeys)
  }
}
