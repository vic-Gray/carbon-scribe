#![no_std]

mod errors;
mod storage;

use errors::Error;
use soroban_sdk::{contract, contractimpl, Address, Env};
use storage::*;

#[contract]
pub struct BufferPoolContract;

#[contractimpl]
impl BufferPoolContract {
    pub fn initialize(
        env: Env,
        admin: Address,
        governance: Address,
        carbon_asset_contract: Address,
        initial_percentage: i64,
    ) -> Result<(), Error> {
        if env.storage().instance().has(&soroban_sdk::Symbol::short("admin")) {
            return Err(Error::AlreadyExists);
        }

        if initial_percentage < 0 || initial_percentage > 10000 {
            return Err(Error::InvalidPercentage);
        }

        set_admin(&env, &admin);
        set_governance(&env, &governance);
        set_carbon_asset_contract(&env, &carbon_asset_contract);
        set_replenishment_percentage(&env, initial_percentage);
        set_total_value_locked(&env, 0);

        Ok(())
    }
}

