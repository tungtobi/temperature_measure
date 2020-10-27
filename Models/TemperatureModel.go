package Models

import "time"

type Temperature struct {
	ID         uint    `gorm:"primaryKey"`
	Enviroment float64 `json:"enviroment" gorm:"enviroment"`
	Target     float64 `json:"target" gorm:"target"`
	CreatedAt  time.Time
}

func (b *Temperature) TableName() string {
	return "temperature"
}
