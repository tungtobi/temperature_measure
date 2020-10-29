package Models

import (
	"rest-test/Config"
)

// GetTemprature re
func GetTemprature(temperature *[]Temperature, startTime uint64, endTime uint64) (err error) {
	if err = Config.DB.Where("created_at BETWEEN ? AND ?", startTime, endTime).Find(temperature).Error; err != nil {
		return err
	}
	return nil
}

// CreateTemperature cr
func CreateTemperature(temperature *Temperature) (err error) {
	if err = Config.DB.Create(temperature).Error; err != nil {
		return err
	}
	return nil
}
