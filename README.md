# VaccineX

VaccineX is a distributed marketplace for genome data used in vaccine development. Most viruses mutates over time and in order to be up to date in a vaccine development proccess research teams must have access to recent genome mutations. 

* Collaborative - Marketplace allows research groups share data with their partners worldwide for free by controlling access to that information using proxy re-encryption scheme provided by NuCypher.
* Distributed - The network is censorship-resistant and allows research teams share pre-encrypted genome data using IPFS without centralized cloud services.
* Decentralized - VaccineX is a blockchain agnostic project which gives users an ability pay for digital assets using Ethereum and ERC20 tokens.

## Project presentation
You could found a project presentation [here](https://drive.google.com/file/d/1e9SeVeltAzGXgycJx-RmXVoIQvskY6PE/view?usp=sharing)

## Requirements

* Node >10
* Angular cli (Run `npm install -g @angular/cli` to install if you don't have it)

## Before start
1. Make sure you have a working VaccineX API server that could be found in that [repository](https://github.com/bahadylbekov/vaccinex_api "VaccineX API")
2. Set up a set of NuCypher's Ursula nodes on federated only network configuration, you could found a step-by-step instrufctions [here](https://docs.nucypher.com/en/latest/guides/network_node/ursula_configuration_guide.html)
3. Run a Docker container with [Vaccinex NuCypher Service](https://github.com/bahadylbekov/vaccinex-nucypher-service)

## Getting started

1. Clone this repository
2. Install repository dependencies with `npm install`
2. Start application by typing `ng serve`
3. Check port :4200
