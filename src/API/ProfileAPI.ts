import { API_ENDPOINT } from "./EndPoints";
import { Fetcher } from "./Fetcher";

export async function createProfile(body: { userId: string; companyName: string; legalName: string; companyAddress: { lineOne: string; lineTwo: string; city: string; state: string; zip: string; country: string; }; legalAddress: { lineOne: string; lineTwo: string; city: string; state: string; zip: string; country: string; }; taxIdentifier: string; email: string; website: string; }){
  const result = await Fetcher?.post(API_ENDPOINT?.CREATE_PROFILE, JSON.stringify(body))
  return result
}

export async function updateProfile(body: { userId: string; companyName: string; legalName: string; companyAddress: { lineOne: string; lineTwo: string; city: string; state: string; zip: string; country: string; }; legalAddress: { lineOne: string; lineTwo: string; city: string; state: string; zip: string; country: string; }; taxIdentifier: string; email: string; website: string; }){
  const result = await Fetcher?.put(API_ENDPOINT?.CREATE_PROFILE, JSON.stringify(body))
  return result
}

export async function getProfileDetail(id: string){
  const result = await Fetcher?.get(API_ENDPOINT?.CREATE_PROFILE+`?id=${id}`)
  return result
}