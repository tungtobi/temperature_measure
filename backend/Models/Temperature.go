package Models

import (
	"rest-test/Config"
	"time"
)

// GetTemprature re
func GetTemprature(temperature *[]Temperature, startTime time.Time, endTime time.Time) (err error) {
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
